import { defineConfig, devices } from '@playwright/test';
import { OrtoniReportConfig } from "ortoni-report";
import * as os from "os";
import dotenv from 'dotenv';

// ✅ Load env once
const envName = process.env.ENV || 'qat';
dotenv.config({
  path: `./config/${envName}.env`,
  override: true,
  debug: false,
});

console.log('👉 Loaded ENV:', envName);
// console.log('👉 USERNAME from env:', process.env.USERNAME);
// console.log('👉 BASE_URL from env:', process.env.BASE_URL);

// Optional report config
const reportConfig: OrtoniReportConfig = {
  open: process.env.CI ? "never" : "always",
  folderPath: "my-report",
  filename: "Ally Portal.html",
  title: "Ally Portal UI Test Report",
  showProject: false,
  projectName: "Ally Portal",
  testType: "E2E-Functional",
  authorName: os.userInfo().username,
  base64Image: false,
  headerText: "Ally Portal UI Automation Report",
  logo: "./assets/AllyLogoDark.svg",
  stdIO: true,
  meta: {
    "Test Cycle": "AN_ALMGMT_V12",
    "Executed On": new Date().toLocaleString(),
    version: "1",
    release: "V12",
    platform: os.type(),
  },
} as any;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: "test-results",

  // reporters
  reporter: [
  //  ['html']
     ["ortoni-report", reportConfig], // optional
  ],

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    viewport: null,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

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
  ],
});
