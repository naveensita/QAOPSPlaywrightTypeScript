// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { workers } from 'node:cluster';
import { trace } from 'node:console';

const config = ({
  testDir: './tests',
  retries:1,
  workers: 6,
  /*workers: '50%',*/
  fullyParallel: false,
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000
  },
  reporter: 'html',

  projects: [
    {
      name: 'safari',
      use: {
        actionTimeout: 20 * 1000,
        navigationTimeout: 30 * 1000,
        browserName: 'webkit',
        headless: false,
        trace: 'on',
        screenshot: 'off',
        ignoreHttpsErrors: true,
        permissions:['geolocation'],
        video: 'retain-on-failure',
        /*viewport:{width:1080, height:1080},*/
        /*...devices['iPhone 17 Pro Max']*/
      },
    },
    {
      name: 'chrome',
      use: {
        actionTimeout: 20 * 1000,
        navigationTimeout: 30 * 1000,
        browserName: 'chromium',
        headless: false,
        trace: 'on',
        screenshot: 'on',
        ignoreHttpsErrors: true,
        permissions:['geolocation'],
        video: 'retain-on-failure',
        /*viewport:{width:720, height:720},*/
        /*...devices['Pixel 10 Pro XL']*/
      },
    },
    {
      name: 'Firefox',
      use: {
        actionTimeout: 20 * 1000,
        navigationTimeout: 30 * 1000,
        browserName: 'firefox',
        headless: false,
        trace: 'on',
        screenshot: 'on',
        ignoreHttpsErrors: true,
        permissions:['geolocation'],
        video: 'retain-on-failure',
        /*viewport:{width:1080, height:1080},*/
        /*...devices['Pixel 10 Pro XL']*/
      },
    }

  ]

});
module.exports = config

