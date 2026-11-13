const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { LoginPage } = require('./LoginPage');
const { MyOrdersPage } = require('./MyOrdersPage');
const { OrderConfirmationPage } = require('./OrderConfirmationPage');
const { OrderSummaryPage } = require('./OrderSummaryPage');
const { ProductCatalogPage } = require('./ProductCatalogPage');


class PageObjectManager {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.productCatalogPage = new ProductCatalogPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.myOrdersPage = new MyOrdersPage(this.page);
        this.orderSummaryPage = new OrderSummaryPage(this.page);
    }

    /** @returns {LoginPage} */
    getLoginPage(){
        return this.loginPage;
    }

    /** @returns {ProductCatalogPage} */
    getProductCatalogPage(){
        return this.productCatalogPage;
    }

    /** @returns {CartPage} */
    getCartPage(){
        return this.cartPage;
    }

    /** @returns {CheckoutPage} */
    getCheckoutPage(){
        return this.checkoutPage;
    }

    /** @returns {OrderConfirmationPage} */
    getOrderConfirmationPage(){
        return this.orderConfirmationPage;
    }

    /** @returns {MyOrdersPage} */
    getMyOrdersPage(){
        return this.myOrdersPage;
    }
    
    /** @returns {OrderSummaryPage} */
    getOrderSummaryPage(){
        return this.orderSummaryPage;
    }

}
module.exports = { PageObjectManager };