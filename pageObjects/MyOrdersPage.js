class MyOrdersPage {

    constructor(page) {
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

    async verifyOrderIdAndClickViewBtn(orderId) {

        for (let i = 0; i < await this.orderTableRows.count(); i++) {
            const rowOrderId = await this.orderTableRows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.orderTableRows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

}
module.exports = { MyOrdersPage };