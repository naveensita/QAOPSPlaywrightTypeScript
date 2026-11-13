// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

const config = ({
  testDir: './tests',
  retries:1,
  workers: 1,
  timeout: 30 * 1000,
  expect:{
    timeout: 5 * 1000
  },
  /*reporter:'html',*/
  reporter: [
    ['html'],
    ['line'],
    ['allure-playwright']
  ],

  use: {
    actionTimeout : 20*1000,
    navigationTimeout : 30*1000,
    /*browserName: 'webkit'*/
    /*browserName: 'firefox'*/
    browserName: 'chromium',
    /*channel: 'msedge',*/
    headless:true,
    /*...devices['Desktop Edge'],*/
    /*trace:'retain-on-failure',*/
    trace: 'on',
    screenshot: 'on'
    
  },

});
module.exports = config


/*1. Install allure report plugin:
     npm i -D @playwright/test allure-playwright
  2. run playwright test with allure-report:
     npx playwright test --grep '@web' --reporter="line,allure-playwright"
  3. open allure report:
     allure generate ./allure-results --clean
     allure open ./allure-report
 */

