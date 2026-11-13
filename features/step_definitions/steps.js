const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
const { PageObjectManager } = require('../../pageObjects/PageObjectManager');

setDefaultTimeout(20 * 1000);


//commands to run and open allure report for cucumber
//Remove-Item -Recurse -Force ./allure-results-cucumber -ErrorAction SilentlyContinue
//npx cucumber-js --format summary --format "allure-cucumberjs/reporter"
//npx allure serve ./allure-results
//npx cucumber-js features/Ecommerce.feature --parallel 2 --exit
//npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html
//npx cucumber-js --tags "@Regression" --retry 1 --exit --format html:cucumber-report.html

const url = "https://rahulshettyacademy.com/client/#/auth/login";
const productName = "ZARA COAT 3";
const username = "naveenpathak715@gmail.com";
const country = "India";

const url2 = "https://rahulshettyacademy.com/loginpagePractise/";
const expectedErrorMsg = "Incorrect username/password.";


Given('Login to ecommerce application with {string} and {string}', { timeout: 10000 }, async function (username, password) {

    const loginPage = this.pageObjectManager.getLoginPage();
    //Login
    await loginPage.navigateToLoginPage(url);
    await loginPage.validLogin(username, password);
});

When('Add {string} to cart', { timeout: 10000 }, async function (productName) {
    //Add to Cart
    this.productCatalogPage = this.pageObjectManager.getProductCatalogPage();
    await this.productCatalogPage.addTocart(productName);
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    //Navigate to cart page
    await this.productCatalogPage.naviagteTOCartPage(productName);
    //Verify Added Product
    await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
    //Navigate to cart page
    await this.productCatalogPage.naviagteTOCartPage(productName);
});

When('Enter valid details and place the order', async function () {
    const cartPage = this.pageObjectManager.getCartPage();
    const checkoutPage = this.pageObjectManager.getCheckoutPage();
    //Verify Added Product
    await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
    //Click Checkout
    await cartPage.clickCheckoutButton();
    //Enter details and checkout
    await expect(checkoutPage.emailLabel).toHaveText(username);
    await expect(checkoutPage.emailTextBox.first()).toHaveValue(username);
    await checkoutPage.enterDetailsForCheckout(country);
    await checkoutPage.clickPlaceOrderButton();
});

Then('Verify order is present in the order history', async function () {
    const orderConfirmationPage = this.pageObjectManager.getOrderConfirmationPage();
    const myOrdersPage = this.pageObjectManager.getMyOrdersPage();
    const orderSummaryPage = this.pageObjectManager.getOrderSummaryPage();
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

Given('Login to ecommerce2 application with {string} and {string}', async function (invalidUsername, password) {
    const usernameField = this.page.locator("#username");
    const passwordField = this.page.locator("#password");
    const signInBtn = this.page.locator("#signInBtn");
    await this.page.goto(url2);
    console.log(await this.page.title());
    await usernameField.fill(invalidUsername);
    await passwordField.fill(password);
    await signInBtn.click();
});

Then('Verify error message is displayed', async function () {
    const errorMsg = await this.page.locator("[style*='block']").textContent();
    console.log(errorMsg);
    expect(await this.page.locator("[style*='block']")).toContainText(expectedErrorMsg);
});