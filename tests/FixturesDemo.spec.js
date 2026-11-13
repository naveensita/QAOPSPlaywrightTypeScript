const {expect} = require('@playwright/test');
const {customTest} = require('../utils/fixtures.js');

/**
 * @param {Object} fixtures
 * @param {import('@playwright/test').Page} fixtures.authenticatedPage
 * @param {{token: string, orderId: string}} fixtures.createOrder
 * @param {{productName: string}} fixtures.testDataForOrder
 */
customTest("Fixtures Demo", async ({authenticatedPage, createOrder, testDataForOrder})=>{

    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.locator("button[routerlink*='/dashboard/myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();

    console.log(testDataForOrder.productName);

});