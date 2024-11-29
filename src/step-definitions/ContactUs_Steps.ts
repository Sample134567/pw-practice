import { Given, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

When('I type a first name', async () => {
  await pageFixture.page.getByPlaceholder('First Name').fill('Joe');
});

When('I type a last name', async () => {
  await pageFixture.page.getByPlaceholder('Last Name').fill('Blogs');
});

When('I enter an email address', async () => {
  await pageFixture.page.getByPlaceholder('Email Address').fill('joe_blog123@example.com');
});

When('I Type a comment', async () => {
  await pageFixture.page.getByPlaceholder('Comments').fill('Hello World');
});

When('I click on the submit button', async () => {
  await pageFixture.page.waitForSelector('input[value="SUBMIT"]');

  await pageFixture.page.click('input[value="SUBMIT"]');
});

Then('I should be presented with a succesful contact us submission message', async () => {
  await pageFixture.page.waitForSelector('#contact_reply h1', { timeout: 60000 });

  const text = await pageFixture.page.innerText('#contact_reply h1');

  expect(text).toBe('Thank You for your Message!');
});

Then('I should be presented with a unsuccesful contact us message', async () => {
  await pageFixture.page.waitForSelector('body');

  const bodyElement = await pageFixture.page.locator("body");

  const bodyText = await bodyElement.textContent();

  await expect(bodyText).not.toMatch('Thank You for your Message!');
})

// Cucumber Expression

When('I type a specific first name {string}', async (firstName: string) => {
  await pageFixture.page.getByPlaceholder('First Name').fill(firstName);
});

When('I type a Specific last name {string}', async (lastName: string) => {
  await pageFixture.page.getByPlaceholder('Last Name').fill(lastName);
});

When('I enter a specific email address {string}', async (emailAddress: string) => {
  await pageFixture.page.getByPlaceholder('Email Address').fill(emailAddress);
});


When('I Type a specific text {string} and a number {int} within the comment input field', async (word: string, number: number) => {
  await pageFixture.page.getByPlaceholder('Comments').fill(word + " " + number);
});


// Random Data - Faker

When('I type a random first name', async () => {
    const randomFirstName = faker.person.firstName();
    await pageFixture.page.getByPlaceholder('First Name').fill(randomFirstName);

});

When('I type a random last name', async () => {
  const randomLastName = faker.person.lastName();
  await pageFixture.page.getByPlaceholder('Last Name').fill(randomLastName);
});

When('I enter a random email address', async () => {
  const randomEmail = faker.internet.email();
  await pageFixture.page.getByPlaceholder('Email Address').fill(randomEmail);
  await pageFixture.page.pause();
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

Then('I should be presented with a header text {string}', async (message: string) =>  {
  await pageFixture.page.waitForSelector("//h1 | //body", {state: 'visible'});

  //get all elements
  const elements = await pageFixture.page.locator("//h1 | //body").elementHandles();
  
  let foundElementText = '';

  //loop through each of the elements
  for(let element of elements) {
      //get the inner text of the element
      let text = await element.innerText();

      //if statement to check whether text includes expected text
      if(text.includes(message)) {
          foundElementText = text;
          break;
      }
  }

  expect(foundElementText).toContain(message);
});