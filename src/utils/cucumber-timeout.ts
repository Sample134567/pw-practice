import { setDefaultTimeout } from "@cucumber/cucumber";

import { config as loadEnv } from "dotenv"
const env = loadEnv({ path: './env/.env' });


const customTimeout = parseInt(env.parsed?.CUCUMBER_CUSTOM_TIMEOUT || '60000');

setDefaultTimeout(customTimeout);