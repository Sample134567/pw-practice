import { When } from "@cucumber/cucumber";
import { CucumberWorld } from "./world/CucumberWorld";

When('I Click on the contact us button', async function (this:CucumberWorld)  {
  this.homePage.clickOnContactUsButton();
});

When('I click on the login portal button', async function (this:CucumberWorld) {
  this.homePage.clickOnLoginPortalButton();
});