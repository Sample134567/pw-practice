import { Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CucumberWorld } from "./world/CucumberWorld";
import logger from "../logger/logger";

When('I type a first name', async function (this: CucumberWorld) {
  logger.info(`Base URL stored in Cucumber World: ${this.getURL()}`);
  await this.contactUsPage.fillFirstName('Joe');
});

When('I type a last name', async function(this: CucumberWorld)  {
  await this.contactUsPage.fillLastName('Bloggs');
});

When('I enter an email address', async function (this: CucumberWorld) {
  await this.contactUsPage.fillemailAddress('G6PdM@example.com');
});

When('I Type a comment', async function (this: CucumberWorld)  {
  await this.contactUsPage.fillComment('Please could you contact me?')
});

When('I click on the submit button', async function(this: CucumberWorld)  {
  await this.contactUsPage.clickOnSubmitButton();
});

Then('I should be presented with a succesful contact us submission message', async function(this: CucumberWorld) {
  const successMessage = await this.contactUsPage.getSuccessfulMessage();
  expect(successMessage).toBe('Thank You for your Message!');
});

Then('I should be presented with a unsuccesful contact us message', async function(this: CucumberWorld) {
const errorMessage = await this.contactUsPage.getErrorMessage();
  await expect(errorMessage).not.toMatch('Thank You for your Message!');
})

// Cucumber Expression

When('I type a specific first name {string}', async function(this: CucumberWorld, firstName: string) {
  await this.contactUsPage.fillFirstName(firstName);
});

When('I type a Specific last name {string}', async function(this: CucumberWorld, lastName: string)  {
  await this.contactUsPage.fillLastName(lastName);

});

When('I enter a specific email address {string}', async function(this: CucumberWorld, emailAddress: string)  {
  await this.contactUsPage.fillemailAddress(emailAddress);
});


When('I Type a specific text {string} and a number {int} within the comment input field', async function (this: CucumberWorld,word: string, number: number) {
  await this.contactUsPage.fillComment(word + " " + number);
});


//Random Data - Faker
When('I type a random first name', async function (this: CucumberWorld) {
  const randomFirstName = faker.person.firstName();
  this.setFirstName(randomFirstName);
  await pageFixture.page.getByPlaceholder('First Name').fill(randomFirstName);
});

When('I type a random last name', async function (this: CucumberWorld) {
  const randomLastName = faker.person.lastName();
  this.setLastName(randomLastName);
  await pageFixture.page.getByPlaceholder('Last Name').fill(randomLastName);
});

When('I enter a random email address', async function (this: CucumberWorld) {
  const randomEmail = faker.internet.email();
  this.setEmailAddress(randomEmail);
  await pageFixture.page.getByPlaceholder('Email Address').fill(randomEmail);
});

When('I type a random comment', async function (this: CucumberWorld) {
  await pageFixture.page.getByPlaceholder('Comments').fill(`Please could you contact me? \n Thanks ${this.getFirstName()} ${this.getLastName()} ${this.getEmailAddress()}`);

});

//Scenario Outline
When('I type a first name {word} and a last name {word}', async (firstName: string, lastName: string) => {
  await pageFixture.page.getByPlaceholder('First Name').fill(firstName);
  await pageFixture.page.getByPlaceholder('Last Name').fill(lastName);
});

When('I type a email address {string} and a {string}', async (email: string, comment: string) => {
  await pageFixture.page.getByPlaceholder('Email Address').fill(email);
  await pageFixture.page.getByPlaceholder('Comments').fill(comment);
});

Then('I should be presented with a header text {string}', async (message: string) => {
  await pageFixture.page.waitForSelector("//h1 | //body", { state: 'visible' });

  //get all elements
  const elements = await pageFixture.page.locator("//h1 | //body").elementHandles();

  let foundElementText = '';

  //loop through each of the elements
  for (let element of elements) {
    //get the inner text of the element
    let text = await element.innerText();

    //if statement to check whether text includes expected text
    if (text.includes(message)) {
      foundElementText = text;
      break;
    }
  }

  expect(foundElementText).toContain(message);
});