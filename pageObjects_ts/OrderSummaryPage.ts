import { Locator, Page } from "@playwright/test";

export class OrderSummaryPage {

    page : Page;
    orderId : Locator;
    
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page : Page) {
        this.page = page;
        this.orderId = this.page.locator(".col-text");
    }

}