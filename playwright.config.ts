import { defineConfig, devices } from '@playwright/test';
import * as os from 'os';
import { ENV } from './tests/config/env';
import { OrtoniReportConfig } from 'ortoni-report';

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
} as any;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: 'test-results',

  use: {
    baseURL: process.env.TEST_ENV
      ? ENV[process.env.TEST_ENV as keyof typeof ENV]
      : ENV.QAT,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: null,  // Full-screen on local + CI
  },

  reporter: [
    ['ortoni-report', reportConfig],
    // ['html', { outputFolder: 'playwright-report', open: 'always' }]
  ],

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,               // required for full-screen
        deviceScaleFactor: undefined, // FIX: required for GitHub Actions
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
    // --- Optional mobile projects ---
    // {
    //   name: 'Mobile Safari',
    //   use: devices['iPhone 13'],
    // },
    // {
    //   name: 'Pixel 5 Android',
    //   use: devices['Pixel 5'],
    // },
  ],
});
