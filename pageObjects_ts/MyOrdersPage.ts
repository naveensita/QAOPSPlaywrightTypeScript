import { Locator, Page } from "@playwright/test";

export class MyOrdersPage {

    page : Page;
    ordersLink : Locator;
    orderTable : Locator;
    orderTableRows : Locator;
    orderId : Locator;

    constructor(page : Page) {
        this.page = page;
        this.ordersLink = this.page.locator("button[routerlink*='/dashboard/myorders']");
        this.orderTable = this.page.locator("tbody");
        this.orderTableRows = this.page.locator("tbody  tr");
        this.orderId = this.page.locator(".col-text");
    }

    async clickOrdersMenu(){
        await this.ordersLink.click();
        await this.orderTable.waitFor();
    }

    async verifyOrderIdAndClickViewBtn(orderId : any) {

        for (let i = 0; i < await this.orderTableRows.count(); i++) {
            const rowOrderId = await this.orderTableRows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.orderTableRows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

}