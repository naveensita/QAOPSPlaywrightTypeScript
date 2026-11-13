const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

const url = "https://rahulshettyacademy.com/client/#/auth/login";
const username = "naveenpathak715@gmail.com";
const password = "Sonu123@#";

test("Client App Playwright Test", async ({page})=> {

    const usernameField = page.locator("#userEmail");
    const passwordField = page.locator("#userPassword");
    const signInBtn = page.locator("#login");

    await page.goto(url);
    console.log(await page.title());
    await usernameField.fill(username);
    await passwordField.fill(password);
    await signInBtn.click();
    await page.waitForLoadState('networkidle');
    const productTitles = await page.locator(".card-body b").allTextContents();
    console.log(productTitles);

});

test("End To End Ecommerce Place Order Test", async ({page})=>{
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
    const productTitles = await page.locator(".card-body b").allTextContents();
    const products = await page.locator(".card-body");
    console.log(productTitles);

    for(let i=0; i<await products.count(); i++){
        const name = await products.nth(i).locator("b").textContent();
        if(name === productName){
            //Add to cart
            await products.nth(i).locator("text=' Add To Cart'").click();
            break;
        }
    }
    await page.locator("[routerlink*='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();
    const flag = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(flag).toBeTruthy();
    await page.locator(".totalRow button.btn-primary").click();
    const actualEmailId = await page.locator(".user__name label").textContent();
    expect(actualEmailId).toEqual(username);
    expect(await page.locator(".user__name input").first().inputValue()).toEqual(username);
    const country = await page.locator("input[placeholder*='Select Country']");
    country.pressSequentially("India");
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    
    //Click Add to cart
    for(let i=0; i<optionsCount; i++){
        const text = (await dropdown.locator("button").nth(i).innerText()).trim();
        if ( text === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }

    }

    await page.locator(".action__submit").click();
    expect(await page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
    const orderId = (await page.locator("label.ng-star-inserted").innerText()).trim().split(" ")[1];
    console.log(orderId);

    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody  tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
             await rows.nth(i).locator("button").first().click();
             break;
        }
        
    }
    const actualOrderId = await page.locator(".col-text").textContent();
    expect(orderId.includes(actualOrderId)).toBeTruthy();

});
