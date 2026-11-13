import { Locator, Page } from "@playwright/test";

export class OrderConfirmationPage {

    page : Page;
    orderText : Locator;
    orderId : Locator;

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page : Page) {
        this.page = page;
        this.orderText = this.page.locator(".hero-primary");
        this.orderId = this.page.locator("label.ng-star-inserted");
    }

    async getOrderId() {
        const orderId = (await this.orderId.innerText()).trim().split(" ")[1];
        console.log(orderId);
        return orderId;
    }

}