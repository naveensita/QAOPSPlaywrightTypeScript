class OrderSummaryPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.orderId = this.page.locator(".col-text");
    }

}
module.exports = { OrderSummaryPage };