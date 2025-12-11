// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import { OrtoniReportConfig } from 'ortoni-report';
import * as os from 'os';
import { CURRENT_ENV } from './tests/config/env';

const reportConfig: OrtoniReportConfig = {
  open: process.env.CI ? 'never' : 'always',
  folderPath: 'my-report',
  filename: 'Ally Portal.html',
  title: 'Ally Portal UI Test Report',
  showProject: false,
  projectName: 'Ally Portal',
  testType: 'E2E-Functional',
  authorName: os.userInfo().username,
  base64Image: false,
  logo: './assets/AllyLogoDark.svg',
  stdIO: true,
  meta: {
    'Test Cycle': 'AN_ALMGMT_V12',
    Environment: process.env.TEST_ENV || 'Local',
    version: '1',
    release: 'V12',
    platform: os.type(),
  },
} as any; // bypass TypeScript for custom properties

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: 'test-results',

  use: {
    baseURL: CURRENT_ENV,
    trace: 'on-first-retry',
    viewport: null,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  reporter: [
    ['ortoni-report', reportConfig],
    // You can add HTML reporter if needed:
    // ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  projects: [
    {
      name: 'Ally_chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 13'] },
    // },
    // {
    //   name: 'Pixel 5 Android',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],
});
