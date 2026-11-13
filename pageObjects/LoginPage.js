class LoginPage {

    constructor(page) {
        this.page = page;
        this.usernameField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
        this.signInBtn = page.locator("#login");
    }

    async navigateToLoginPage(url) {
        await this.page.goto(url);
        console.log(await this.page.title());
    }

    async validLogin(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

}
module.exports = { LoginPage };