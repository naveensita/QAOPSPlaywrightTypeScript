import { Page } from '@playwright/test';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { LoginPage } from './LoginPage';
import { MyOrdersPage } from './MyOrdersPage';
import { OrderConfirmationPage } from './OrderConfirmationPage';
import { OrderSummaryPage } from './OrderSummaryPage';
import { ProductCatalogPage } from './ProductCatalogPage';

export class PageObjectManager {

    page : Page
    loginPage : LoginPage;
    productCatalogPage : ProductCatalogPage;
    cartPage : CartPage;
    checkoutPage : CheckoutPage;
    orderConfirmationPage : OrderConfirmationPage;
    myOrdersPage : MyOrdersPage;
    orderSummaryPage : OrderSummaryPage;

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page : Page) {
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