import { BasePage } from "./base/BasePage";

export class ContactUsPage extends BasePage {
    // Type a first name 
    public async fillFirstName(firstName: string): Promise<void> {
        await this.page.getByPlaceholder('First Name').fill(firstName);
    }

    // Type a Last name 
    public async fillLastName(lastName: string): Promise<void> {
        await this.page.getByPlaceholder('Last Name').fill(lastName);
    }

    // Type a Email address 
    public async fillemailAddress(emailAddress: string): Promise<void> {
        await this.page.getByPlaceholder('Last Name').fill(emailAddress);
    }

    // Type a comment 
    public async fillComment(comment: string): Promise<void> {
        await this.page.getByPlaceholder('comments').fill(comment);
    }

    // Click submit button 
    public async clickOnSubmitButton(): Promise<void> {
        await this.page.waitForSelector('input[value="SUBMIT"]');
        await this.page.click('input[value="SUBMIT"]');
    }

    // Get successful message
    public async getSuccessfulMessage(): Promise<string> {
        await this.page.waitForSelector('#contact_reply h1', { timeout: 60000 });
        return await this.page.innerText('#contact_reply h1');
    }

    // Get error message
    public async getErrorMessage(): Promise<string> {
        await this.page.waitForSelector('body');

        const bodyElement = await this.page.locator("body");

        const bodyText = await bodyElement.textContent();
        return bodyText ?? '';
    }

    // Get header text
    public async getHeaderText(message: string): Promise<string> {
        await this.page.waitForSelector("//h1 | //body", { state: 'visible' });

        //get all elements
        const elements = await this.page.locator("//h1 | //body").elementHandles();

        let foundElementText = '';

        //loop through each of the elements
        for (let element of elements) {
            //get the inner text of the element
            let text = await element.innerText();

            //if statement to check whether text includes expected text
            if (text.includes(message)) {
                foundElementText = text;
                break;
            }
        }

        return foundElementText
    }
}