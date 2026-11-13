const ExcelJs = require('exceljs');
const path = require('path');
const fs = require('fs');

class ExcelUtils {

    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
    }

    /**
       * Downloads a file from a specified URL and saves it to the root /downloads folder.
       * Cleans up any existing file with the same name before saving.
       * 
       * @param {string} url - Target URL to navigate to
       * @param {string} fileName - Desired file name (e.g., 'downloaded_file.xlsx')
       * @returns {Promise<string>} The absolute path to the saved file
       */
    async downloadExcelFile(url, fileName) {
        await this.page.goto(url);

        // 1. Resolve folder and target file paths
        const downloadDir = path.join(process.cwd(), 'downloads');
        const filePath = path.join(downloadDir, fileName);

        // 2. Ensure downloads directory exists
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }

        // 3. Delete existing file if present
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted existing file: ${filePath}`);
        }

        // 4. Trigger and wait for download
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.getByRole('button', { name: 'Download' }).click(),
        ]);

        // 5. Save the file and return path
        await download.saveAs(filePath);
        console.log(`Saved new file to: ${filePath}`);

        return filePath;
    }

    /**
   * Searches for a text value inside an Excel sheet and returns its row and column coordinates.
   * 
   * @param {string} filePath - Absolute path to the Excel file
   * @param {string|number} sheetIdentifier - Name of the sheet (e.g. "Sheet1") or 1-based index (e.g. 1)
   * @param {string} searchText - Value to search for (e.g. 'Banana')
   * @returns {Promise<{row: number, column: number}>} The row and column coordinates ({row: -1, column: -1} if not found)
   */
    async readExcelCell(filePath, sheetIdentifier, searchText) {

        let output = { row: -1, column: -1 };

        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(filePath);

        // Supports sheet name string or numeric index
        const worksheet = workbook.getWorksheet(sheetIdentifier);
        if (!worksheet) {
            throw new Error(`Worksheet "${sheetIdentifier}" was not found in ${filePath}`);
        }
        console.log(`Searching in sheet: ${worksheet.name}`);

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === searchText) {
                    output.row = rowNumber;
                    output.column = colNumber;
                }
            });
        });
        return output;
    }

    /**
   * Modifies a cell's value in the Excel sheet and saves the file.
   *
   * @param {string} filePath - Absolute path to the Excel file
   * @param {string|number} sheetIdentifier - Sheet name or 1-based index
   * @param {number} row - Target row number
   * @param {number} column - Target column number
   * @param {any} replaceValue - New value to write
   */
    async modifyExcel(filePath, sheetIdentifier, row, column, replaceValue) {

        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.getWorksheet(sheetIdentifier);
        if (!worksheet) {
            throw new Error(`Worksheet "${sheetIdentifier}" not found in ${filePath}`);
        }

        const cell = worksheet.getCell(row, column);
        cell.value = replaceValue;

        await workbook.xlsx.writeFile(filePath);
        console.log(`Updated cell at [${row}, ${column}] to "${replaceValue}" and saved to ${filePath}`);

    }
}
module.exports = { ExcelUtils };