import { exec } from 'child_process';
import dotenv from 'dotenv';
dotenv.config({ path: './env/.env' });

// Setting retry value from environment variable or defaulting to '0'
const parallelValue = process.env.PARALLEL || '1';
const retryValue = process.env.RETRY || '0';

// Define a custom type for the browserContextFixture object
const common = `./src/features/*.feature \
    --require-module ts-node/register \
    --require ./src/step-definitions/**/**/*.ts \
    --require ./src/utils/cucumber-timeout.ts \
    -f json:./reports/report.json \
    --format html:./reports/report.html \
    --parallel ${parallelValue} \
    --retry ${retryValue} \
    --tags "not @ignore"`;


// Define interface for profile object
interface ProfileCommands {
    [key: string]: string;
}

// Define a command strings for different test profiles
const profiles: ProfileCommands = {
    smoke: `${common} --tags @smoke`,
    regression: `${common} --tags @regression`,
    login: `${common} --tags @login`,
    contactUs: `${common} --tags @contactUs`,
}

// Get the third command-line argument and assign it to a variable
const profile = process.argv[2];

// Construct the command string based on the selected profile

let command = `npx cucumber-js ${profiles[profile as 'smoke' | 'regression' | 'login' | 'contactUs']}`;

// Execute the command 
exec(command, {encoding: 'utf-8'}, (error: Error | null, stdout: string) => {
    //Log the output of the command
    console.log(stdout);
    
    //Check if there was an error during execution
    if (error) {
        throw new Error(`Some automation test(s) have failed! - Please Review.`);
        process.exit(1);
    }
});
//console.log(command);
