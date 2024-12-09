import { exec } from 'child_process';
import { config } from '../config';

// Define a custom type for the browserContextFixture object
const common = `./src/features/*.feature \
    --require-module ts-node/register \
    --require ./src/step-definitions/**/**/*.ts \
    --require ./src/utils/cucumber-timeout.ts \
    -f json:./reports/report.json \
    --format html:./reports/report.html \
    --parallel ${config.parallel} \
    --retry ${config.parallel} \
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
