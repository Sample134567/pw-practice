import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { PageManager } from "../../page-objects/base/PageManager";
import { BasePage } from "../../page-objects/base/BasePage";

export class CucumberWorld extends World {
    public pageManager: PageManager;
    public basePage: BasePage

    //Base URL
    private url?: string;

    //Person
    private firstName?: string;
    private lastName?: string;
    private emailAddress?: string;

    constructor({attach, log, parameters}: IWorldOptions) {
        super({attach, log, parameters} as any); // pass the options to the world constructor
        this.pageManager = new PageManager();
        this.basePage = this.pageManager.createBasePage(); 
    }

    //Setter methods for URL, first name etc:
    setUrl(url: string) {
        this.url = url;
    }

    setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    setLastName(lastName: string) {
        this.lastName = lastName;
    }

    setEmailAddress(emailAddress: string) {
        this.emailAddress = emailAddress;
    }

    //Getter methods for URL, first name etc:
    getURL() {
        return this.url;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getEmailAddress() {
        return this.emailAddress;
    }
}

//Tells Cucumber World to use our Custom World
setWorldConstructor(CucumberWorld);