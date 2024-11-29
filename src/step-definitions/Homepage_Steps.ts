import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";

const url = 'https://webdriveruniversity.com/';

Given('I navigate to WebdriverUniversity homepage', async () => {
  await pageFixture.page.goto(url);
});

When('I Click on the contact us button', async () => {
  const contactUs_Button = await pageFixture.page.getByRole('link', { name: 'CONTACT US Contact Us Form' });
  await contactUs_Button.click();
});

When('I click on the login portal button', async () => {
  const login_button = await pageFixture.page.getByRole('link', { name: 'LOGIN PORTAL Login Portal' });
  await login_button.click();
});