import {test as baseTest, request, Page} from '@playwright/test';
import {APIUtils} from './APIUtils.ts';

const url : string = "https://rahulshettyacademy.com/client/#/auth/login";
const username : string = "naveenpathak715@gmail.com";
const password : string = "Sonu123@#";
const loginPayload = {userEmail:"naveenpathak715@gmail.com",userPassword:"Sonu123@#"};
const createOrderPayload = {"orders":[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

type CustomFixtures = {
    authenticatedPage: Page;
    createOrder: {
        token: string;
        orderId: string;
    };
    testDataForOrder: {
        productName: string;
    };
}

export const customTest = baseTest.extend<CustomFixtures>({
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