const {test, expect} = require('@playwright/test');

test("Playwright Specific Locators Test", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("Sonu321@#");

    await page.getByRole("button", {name : 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:8000});
    await page.getByRole("link", {name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
});

test("Playwright test level timeout", async({page})=>{

    test.setTimeout(60000);
    const slowExpect = expect.configure({timeout : 9000});
    page.setDefaultTimeout(9000);

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("Sonu321@#");

    await page.getByRole("button", {name : 'Submit'}).click({timeout:15000});
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await page.getByRole("link", {name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();

});