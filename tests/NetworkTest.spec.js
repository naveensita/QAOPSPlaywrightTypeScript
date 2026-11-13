const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');

const loginPayload = {userEmail:"naveenpathak715@gmail.com",userPassword:"Sonu123@#"};
const createOrderPayload = {"orders":[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const url = "https://rahulshettyacademy.com/client/#/auth/login";
const username = "naveenpathak715@gmail.com";
let fakePayloadOrders = {data:[],message:"No Orders"};
let response;


test.beforeAll(async()=>{

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);

});

test("Network Response Mock Test", async({page})=>{

    const productName = "ZARA COAT 3";
    
    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto(url);

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>{
            //Intercepting the response->API response->{Playwright fake response}->browser->render on browser
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill({
                response,
                body,
            });
        });
    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    //await page.waitForLoadState('networkidle');
    //await page.locator(".mt-4").waitFor();
    const textMsg = await page.locator(".mt-4").textContent();
    console.log(textMsg);
    expect(await page.locator(".mt-4")).toBeVisible();

    //await page.pause();
    
    
});