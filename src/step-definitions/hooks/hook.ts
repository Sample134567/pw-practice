import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserType, chromium, firefox, webkit } from "@playwright/test";
import { pageFixture } from "./browserContextFixture";
import { setGlobalSettings } from "../../utils/playwright-timeouts";
import { config } from "../../../config";
import { PageManager } from "../../page-objects/base/PageManager";

const browsers: { [key: string]: BrowserType } = {
    'chromium': chromium,
    'firefox': firefox,
    'webkit': webkit
};

let browserInstance: Browser | null = null;

async function initializeBrowserContext(selectedBrowser: string): Promise<Browser> {
    const launchBrowser = browsers[selectedBrowser];
    if (!launchBrowser) {
        throw new Error(`Invalid browser Selected: ${selectedBrowser}`);
    }

    return await launchBrowser.launch({ headless: config.headless });
}

async function initializePage(): Promise<void> {
    if (!browserInstance) {
        throw new Error('Browser instance is null')
    }

    pageFixture.context = await browserInstance.newContext({
        ignoreHTTPSErrors: true
    });
    pageFixture.page = await pageFixture.context.newPage();
    setGlobalSettings(pageFixture.page);
    await pageFixture.page.setViewportSize({ width: config.width, height: config.height });
}

BeforeAll(async function () {
    console.log('\nExecuting test suite...');
})

AfterAll(async function () {
    console.log('\Finished execution of test suite!...');
})

Before(async function () {
    try {
        browserInstance = await initializeBrowserContext(config.browser);
        console.log(`Browser context initialize for: ${config.browser}`)
        await initializePage();

        this.pageManager = new PageManager();
        this.basePage = this.pageManager.createBasePage();
        this.homePage = this.pageManager.createHomePage();
    }
    catch (error) {
        console.log(`Browser context initialize Failed: `, error)

    }
})

After(async function ({ pickle, result }) {
    if (result?.status === Status.FAILED) {
        if (pageFixture.page) {
            const screenshotPath = `./reports/screenshots/${pickle.name}-${Date.now()}.png`;
            const image = await pageFixture.page.screenshot({
                path: screenshotPath,
                type: 'png',

            });
            await this.attach(image, 'image/png');
        } else {
            console.error('pageFixture.page is not defined');
        }
    }
    if (browserInstance) {
        await pageFixture.page?.close();
        await browserInstance.close();
    }
})