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