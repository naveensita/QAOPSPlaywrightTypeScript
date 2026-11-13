const {test, expect} = require('@playwright/test');

/*test.describe.configure({mode : 'parallel'});*/
test.describe.configure({mode : 'serial'});
test("@web Popup and frames validation test", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.getByRole("button", {name:'Hide'}).click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    await page.getByRole("button", {name:'Show'}).click();
    //await page.pause();

    page.on('dialog', dialog=>dialog.accept());
    await page.getByRole("button", {name:'Alert'}).click();
    await page.getByRole("button", {name:'Confirm'}).click();

    await page.getByRole("button", {name:'Mouse Hover'}).hover();

    const framesPage = await page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
    
});

test("@web w2   Screenshots and visual testing test", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.getByPlaceholder("Hide/Show Example").screenshot({path:'partialScreenshot.png'});
    await page.getByRole("button", {name:'Hide'}).click();
    await page.screenshot({path:'Screenshot.png'});
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    await page.getByRole("button", {name:'Show'}).click();
});

test("Visual testing test", async ({page})=>{

    await page.goto("https://www.google.com/");

    expect(await page.screenshot()).toMatchSnapshot('landing.png', {maxDiffPixelRatio: 0.05});
});