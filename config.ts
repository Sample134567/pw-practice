import * as dotenv from 'dotenv';
import * as path from 'path';

// Determine which environment file to load
dotenv.config();
const environment = process.env.NODE_ENV || 'qa';
const envFile = path.resolve(__dirname, `./env/.env.${environment}`);

// Load the appropriate .env file
const result = dotenv.config({ path: envFile });

// Checker if the .env file was successfully loaded
if (result.error) {
    console.error(`Failed to load .env file: ${envFile}`, result.error);
} else {
    console.log(`Loaded .env file: ${envFile}`);
}

// Create a configuration object for easy access to env variables
export const config = {
    headless: process.env.HEADLESS === 'true',
    browser: process.env.UI_AUTOMATION_BROWSER || 'chromium',
    width: parseInt(process.env.BROWSER_WIDTH || '1920'),
    height: parseInt(process.env.BROWSER_HEIGHT || '1080'),
    URL: process.env.URL || 'https://console-test.remtrax.com/login',
    logLevel: process.env.LOG_LEVEL || 'info',
    parallel: parseInt(process.env.PARALLEL || '1', 10),
    retry: parseInt(process.env.RETRY || '0', 10),
    uiAutomationNavigationTimeout: parseInt(process.env.UI_AUTOMATION_NAVIGATION_TIMEOUT || '50000'),
    uiAutomationCommandTimeout: parseInt(process.env.UI_AUTOMATION_COMMAND_TIMEOUT || '30000'),
    cucumberCustomTimeout: parseInt(process.env.CUCUMBER_CUSTOM_TIMEOUT || '60000'),
};
