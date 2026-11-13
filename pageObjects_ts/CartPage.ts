import { Locator, Page } from "@playwright/test";

export class CartPage{
    
    page : Page;
    checkoutBtn : Locator;
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page : Page){
        this.page = page;
        this.checkoutBtn = this.page.locator(".totalRow button.btn-primary");
    }

    async clickCheckoutButton(){
        await this.checkoutBtn.click();
    }
}