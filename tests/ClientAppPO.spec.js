const { test, expect } = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const { PageObjectManager } = require('../pageObjects/PageObjectManager');
const dataSet = JSON.parse(JSON.stringify(require('../resources/placeOrderTestdata.json')));

const url = "https://rahulshettyacademy.com/client/#/auth/login";

for (const data of dataSet) {
    test(`End To End Ecommerce Place Order Test for ${data.productName}`, async ({ page }) => {
        const productName = "ZARA COAT 3";

        const pageObjectManager = new PageObjectManager(page);
        const loginPage = pageObjectManager.getLoginPage();
        const productCatalogPage = pageObjectManager.getProductCatalogPage();
        const cartPage = pageObjectManager.getCartPage();
        /** @type {import('../pageObjects/OrderConfirmationPage').OrderConfirmationPage} */
        const orderConfirmationPage = pageObjectManager.getOrderConfirmationPage();
        /** @type {import('../pageObjects/CheckoutPage').CheckoutPage} */
        const checkoutPage = pageObjectManager.getCheckoutPage();
        /** @type {import('../pageObjects/MyOrdersPage').MyOrdersPage} */
        const myOrdersPage = pageObjectManager.getMyOrdersPage();
        /** @type {import('../pageObjects/OrderSummaryPage').OrderSummaryPage} */
        const orderSummaryPage = pageObjectManager.getOrderSummaryPage();

        //Login
        await loginPage.navigateToLoginPage(url);
        await loginPage.validLogin(data.username, data.password);

        //Add to Cart
        await productCatalogPage.addTocart(data.productName);

        //Navigate to cart page
        await productCatalogPage.naviagteTOCartPage(data.productName);
        //Verify Added Product
        await expect(page.getByRole('heading', { name: data.productName })).toBeVisible();
        //Click Checkout
        await cartPage.clickCheckoutButton();
        //Enter details and checkout
        await expect(checkoutPage.emailLabel).toHaveText(data.username);
        await expect(checkoutPage.emailTextBox.first()).toHaveValue(data.username);
        await checkoutPage.enterDetailsForCheckout(data.country);
        await checkoutPage.clickPlaceOrderButton();

        //Verify order Message
        await expect(orderConfirmationPage.orderText).toHaveText("Thankyou for the order.");
        //Get order Id
        const orderId = await orderConfirmationPage.getOrderId();
        //Navigate to my orders page
        await myOrdersPage.clickOrdersMenu();
        //Verify order Id and click view button
        await myOrdersPage.verifyOrderIdAndClickViewBtn(orderId);
        //Verify order Id on order confirmation page
        await expect(orderId.includes(await orderSummaryPage.orderId.textContent())).toBeTruthy();

    });
}

customtest(`@web End To End Ecommerce Place Order Test with fixtures data set`, async ({ page, testDataForOrder }) => {
    const productName = "ZARA COAT 3";

    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPage();
    const productCatalogPage = pageObjectManager.getProductCatalogPage();
    const cartPage = pageObjectManager.getCartPage();
    /** @type {import('../pageObjects/OrderConfirmationPage').OrderConfirmationPage} */
    const orderConfirmationPage = pageObjectManager.getOrderConfirmationPage();
    /** @type {import('../pageObjects/CheckoutPage').CheckoutPage} */
    const checkoutPage = pageObjectManager.getCheckoutPage();

    //Login
    await loginPage.navigateToLoginPage(url);
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    //Add to Cart
    await productCatalogPage.addTocart(testDataForOrder.productName);

    //Navigate to cart page
    await productCatalogPage.naviagteTOCartPage(testDataForOrder.productName);
    //Verify Added Product
    await expect(page.getByRole('heading', { name: testDataForOrder.productName })).toBeVisible();
    //Click Checkout
    await cartPage.clickCheckoutButton();
    //Enter details and checkout
    await expect(checkoutPage.emailLabel).toHaveText(testDataForOrder.username);
    await expect(checkoutPage.emailTextBox.first()).toHaveValue(testDataForOrder.username);
    await checkoutPage.enterDetailsForCheckout(testDataForOrder.country);
    await checkoutPage.clickPlaceOrderButton();
});
