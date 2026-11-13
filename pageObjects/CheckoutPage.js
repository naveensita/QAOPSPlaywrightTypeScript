const {test} = require('@playwright/test');

class CheckoutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        /** @type {import('@playwright/test').Locator} */
        this.emailLabel = this.page.locator(".user__name label");
        this.emailTextBox = this.page.locator(".user__name input");
        this.countryDropdown = this.page.locator("input[placeholder*='Select Country']");
        this.countryList = this.page.locator(".ta-results");
        this.countryNames = this.countryList.locator("button");
        this.placeOrderButton = this.page.locator(".action__submit");
    }

    async enterDetailsForCheckout(countryName) {
        await this.countryDropdown.pressSequentially(countryName);
        await this.countryList.waitFor();
        const optionsCount = await this.countryNames.count();

        for (let i = 0; i < optionsCount; i++) {
            const text = (await this.countryNames.nth(i).innerText()).trim();
            if (text === countryName) {
                await this.countryNames.nth(i).click();
                break;
            }
        }
    }

    async clickPlaceOrderButton(){
        await this.placeOrderButton.click();
    }

}
module.exports = { CheckoutPage };