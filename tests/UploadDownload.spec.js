const { test, expect } = require('@playwright/test');
const ExcelJs = require('exceljs');
const { ExcelUtils } = require('../utils/ExcelUtils');

/**
 * @test Upload and Download Excel Data Synchronization
 * @description Verifies end-to-end data processing with ExcelJS and Playwright:
 *   1. Navigates to the portal and downloads the baseline product catalog spreadsheet.
 *   2. Parses the workbook to locate target fruit coordinates dynamically.
 *   3. Updates the unit price in the Excel file as a numeric integer.
 *   4. Re-uploads the modified spreadsheet via the file input.
 *   5. Asserts that the table DOM dynamically renders the updated price.
 */
test("Upload download excel file test", async ({ page }) => {

    const excelUtils = new ExcelUtils(page);

    const targetUrl = "https://rahulshettyacademy.com/upload-download-test/index.html";
    const fileName = "downloaded_file.xlsx";
    const fruitName = "Apple";
    const updatedPrice = 350;

    // 1. Download the Excel file
    const filePath = await excelUtils.downloadExcelFile(targetUrl, fileName);

    // 2. Find row & column for 'Banana'
    const coordinates = await excelUtils.readExcelCell(filePath, "Sheet1", fruitName);
    console.log(`Found "${fruitName}" at Row: ${coordinates.row}, Column: ${coordinates.column}`);

    // 3. Modify the price cell (Price is 2 columns to the right: fruit name is col 2, price is col 4)
    const priceColumn = coordinates.column + 2;
    await excelUtils.modifyExcel(filePath, "Sheet1", coordinates.row, priceColumn, updatedPrice);

    // 4. Upload file
    await page.locator("#fileinput").setInputFiles(filePath);

    // 5. Playwright assertion expects a string representation in the DOM
    const textLocator = page.getByText(fruitName);
    const desiredRow = page.getByRole('row').filter({ has: textLocator });
    await expect(desiredRow.locator('#cell-4-undefined')).toHaveText(updatedPrice.toString());

});