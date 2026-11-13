const playwright = require('@playwright/test');
const { PageObjectManager } = require('../../pageObjects/PageObjectManager');
const { BeforeAll, Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const fs = require('fs');

BeforeAll(function () {
    // Automatically deletes allure-results-cucumber once before any scenario runs
    fs.rmSync('./allure-results-cucumber', { recursive: true, force: true });
    console.log("Cleaned old allure-results-cucumber folder!");
});

Before({ tags: '@Validation or @Regression' }, async function () {
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.pageObjectManager = new PageObjectManager(this.page);
});

After(async function () {
    console.log("I am last to execute.");
    if (this.page) {
        await this.page.close();
    }
    if (this.context) {
        await this.context.close();
    }
    if (this.browser) {
        await this.browser.close();
    }
    console.log("Browser closed for scenario");
});

BeforeStep(async function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        //await this.page.screenshot({ path: 'failedScreenShot.png' });
        // 1. Capture screenshot as a buffer
        const screenshotBuffer = await this.page.screenshot({ path: 'screenshot1.png' });
        
        // 2. Attach buffer to Cucumber world -> Allure automatically picks this up!
        await this.attach(screenshotBuffer, 'image/png');
    }
});