import { Locator, Page } from "@playwright/test";

export class LoginPage {

    page : Page;
    usernameField : Locator;
    passwordField : Locator;
    signInBtn : Locator;

    constructor(page : Page) {
        this.page = page;
        this.usernameField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
        this.signInBtn = page.locator("#login");
    }

    async navigateToLoginPage(url : string) {
        await this.page.goto(url);
        console.log(await this.page.title());
    }

    async validLogin(username : string, password : string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

}