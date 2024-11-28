import { Given, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";

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
  await pageFixture.page.waitForSelector('#contact_reply h1', {timeout: 60000});

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
