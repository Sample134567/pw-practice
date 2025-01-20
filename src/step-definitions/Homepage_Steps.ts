import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { CucumberWorld } from "./world/CucumberWorld";

When('I Click on the contact us button', async function (this:CucumberWorld)  {
  this.basePage.waitAndClickByRole('link', 'CONTACT US Contact Us Form');
});

When('I click on the login portal button', async function (this:CucumberWorld) {
  this.basePage.waitAndClickByRole('link', 'LOGIN PORTAL Login Portal');
});