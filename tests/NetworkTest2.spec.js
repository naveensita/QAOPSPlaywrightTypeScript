const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');

const url = "https://rahulshettyacademy.com/client/#/auth/login";
const username = "naveenpathak715@gmail.com";
const password = "Sonu123@#";
let fakePayloadOrders = {data:[],message:"No Orders"};
let response;


test("Network Request Mock Test", async({page})=>{

    const productName = "ZARA COAT 3";

    const usernameField = page.locator("#userEmail");
    const passwordField = page.locator("#userPassword");
    const signInBtn = page.locator("#login");

    await page.goto(url);
    console.log(await page.title());
    await usernameField.fill(username);
    await passwordField.fill(password);
    await signInBtn.click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route=>await route.continue({url : 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6af27d9592a4341c4c0e1824'})
    );

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me")).toBeVisible();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
    const errorMsg = await page.locator(".blink_me").textContent();
    console.log(errorMsg);
    expect(errorMsg.trim()).toEqual("You are not authorize to view this order");
    
});