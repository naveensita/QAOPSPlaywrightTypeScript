class CartPage{
    
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page){
        this.page = page;
        this.checkoutBtn = this.page.locator(".totalRow button.btn-primary");
    }

    async clickCheckoutButton(){
        await this.checkoutBtn.click();
    }
}
module.exports = {CartPage};