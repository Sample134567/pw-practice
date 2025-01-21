import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from '../logger/logger';
import { config } from "../../config";
import { CucumberWorld } from "./world/CucumberWorld";

When('I switch to new browser tab', async function (this: CucumberWorld) {
  await this.basePage.switchToNewTab();
});

Given('I navigate to WebdriverUniversity homepage', async function (this: CucumberWorld) {
  try {
    // await pageFixture.page.goto(config.URL);
    await this.basePage.navigate(config.URL);
    logger.info('Accessing URL: ' + config.URL);
    this.setUrl(config.URL)
  } catch (error: any) {
    logger.error('An error has occur:' + error.message);
  }

});