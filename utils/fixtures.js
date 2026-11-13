const baseTest = require('@playwright/test');
const {request} = require('@playwright/test');
const {APIUtils} = require('./APIUtils.js');

const url = "https://rahulshettyacademy.com/client/#/auth/login";
const username = "naveenpathak715@gmail.com";
const password = "Sonu123@#";
const loginPayload = {userEmail:"naveenpathak715@gmail.com",userPassword:"Sonu123@#"};
const createOrderPayload = {"orders":[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

/**
 * @typedef {Object} CustomFixtures
 * @property {import('@playwright/test').Page} authenticatedPage
 * @property {{token: string, orderId: string}} createOrder
 * @property {{productName: string}} testDataForOrder
 */

/** @type {import('@playwright/test').TestType<CustomFixtures, {}>} */
exports.customTest = baseTest.test.extend({
    authenticatedPage: async ({browser}, use)=>{
        const context = await browser.newContext();
        const page = await context.newPage();
        const usernameField = page.locator("#userEmail");
        const passwordField = page.locator("#userPassword");
        const signInBtn = page.locator("#login");

        await page.goto(url);
        await usernameField.fill(username);
        await passwordField.fill(password);
        await signInBtn.click();
        await page.waitForLoadState('networkidle');

        await use(page);
        //teardown
        await context.close();
    },
    createOrder: async({}, use)=>{
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, loginPayload);
        const response = await apiUtils.createOrder(createOrderPayload);

        await use(response);
        //teardown
        await apiContext.dispose();
    },
    testDataForOrder: {
        productName : "ADIDAS ORIGINAL"
    }
});