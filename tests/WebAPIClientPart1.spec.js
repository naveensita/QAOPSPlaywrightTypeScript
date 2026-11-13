const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');

const loginPayload = {userEmail:"naveenpathak715@gmail.com",userPassword:"Sonu123@#"};
const createOrderPayload = {"orders":[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const url = "https://rahulshettyacademy.com/client/#/auth/login";
const username = "naveenpathak715@gmail.com";
let response;


test.beforeAll(async()=>{

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);

});

test("@API Web API Client APP Test Part 1", async({page})=>{

    const productName = "ZARA COAT 3";
    
    page.addInitScript(value =>{
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto(url);
    
    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    
    const rows = await page.locator("tbody  tr");
    
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
            
    }
    const actualOrderId = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(actualOrderId)).toBeTruthy();

});