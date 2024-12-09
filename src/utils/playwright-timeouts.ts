import { Page } from "@playwright/test";
import { config } from "../../config";



export function setGlobalSettings(page: Page) {
    //Set global navigation timeout
    page.setDefaultNavigationTimeout(config.uiAutomationNavigationTimeout);

    //Set global command timeout
    page.setDefaultTimeout(config.uiAutomationCommandTimeout);
}