const {test, expect} = require('@playwright/test');
const { request } = require('node:http');

const url = "https://rahulshettyacademy.com/loginpagePractise/";
const invalidUsername = "rahulshetty";
const username = "rahulshettyacademy";
const password = "Learning@830$3mK2";
const expectedErrorMsg = "Incorrect username/password.";

test("Browser context Playwright Test", async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();

    //Abort request call for css
    //page.route("**/*.css", route=>route.abort());
    //page.route("**/*.{jpg, png, jpeg}", route=>route.abort());
    
    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");

    await page.goto(url);
    console.log(await page.title());
    await page.locator("#username").fill(username);
    await page.locator("#password").fill(password);
    await page.locator("#signInBtn").click();

    //Getting network calls and status code in console
    //page.on('request', request=>console.log(request.url()));
    //page.on('response', response=>console.log(response.url(), response.status()));
    //await page.pause();

});

test("Invalid Login Playwright Test", async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();
    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");
    await page.goto(url);
    console.log(await page.title());
    await usernameField.fill(invalidUsername);
    await passwordField.fill(password);
    await signInBtn.click();
    const errorMsg = await page.locator("[style*='block']").textContent();
    console.log(errorMsg);
    //expect(errorMsg).toContain(expectedErrorMsg);
    expect(errorMsg).toEqual(expectedErrorMsg);
    await usernameField.fill("");
    await usernameField.fill(username);
    await signInBtn.click();
    console.log(await page.title());
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
    

});

test("Page Playwright Test", async ({page})=> {

    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});

test("UI Controls Test", async ({page})=> {

    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");

    await page.goto(url);
    console.log(await page.title());
    await usernameField.fill(username);
    await passwordField.fill(password);
    const dropDown = await page.locator("select.form-control");
    dropDown.selectOption("consult");
    await page.locator(".checkmark").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".checkmark").last()).toBeChecked();
    console.log(await page.locator(".checkmark").last().isChecked());
    await page.locator("#terms").check();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    const documentLink = page.locator("a[href*='documents-request']");
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    //await documentLink.click();
    //await page.pause();

    //await signInBtn.click();
    //console.log(await page.locator(".card-body a").first().textContent());
    

});

test("Child window handling", async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");

    await page.goto(url);
    const documentLink = page.locator("a[href*='documents-request']");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ])
    const linkText = await newPage.locator(".red").textContent();
    console.log(linkText);
    const emailText = linkText.split("@")[1].split(" ")[0].split(".")[0];
    await usernameField.fill(emailText);
    await passwordField.fill(password);
    //console.log(await usernameField.textContent());//will not work because it is not attached with DOM
    console.log(await usernameField.inputValue());
    await signInBtn.click();
    await page.waitForLoadState('networkidle');
});