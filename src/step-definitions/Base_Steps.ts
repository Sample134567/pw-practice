import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from '../logger/logger';
import { config } from "../../config";
import { CucumberWorld } from "./world/CucumberWorld";

When('I switch to new browser tab', async () => {
  await pageFixture.context.waitForEvent('page');

  const allPages = await pageFixture.context.pages();

  pageFixture.page = allPages[allPages.length - 1];

  await pageFixture.page.bringToFront();

  await pageFixture.page.setViewportSize({ width: config.width, height: config.height });
});

Given('I navigate to WebdriverUniversity homepage', async function (this: CucumberWorld) {
  try {
    await pageFixture.page.goto(config.URL);
    logger.info('Accessing URL: ' + config.URL);
    this.setUrl(config.URL)
  } catch (error: any) {
    logger.error('An error has occur:' + error.message);
  }

});