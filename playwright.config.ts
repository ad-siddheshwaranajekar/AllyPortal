import { defineConfig, devices } from '@playwright/test';
import * as os from 'os';
import { ENV, EnvironmentKey } from './tests/config/env';

import { OrtoniReportConfig } from 'ortoni-report';

// 🔵 Debug environment selection (shows in GitHub Actions logs)
console.log("🔵 Playwright CONFIG TEST_ENV:", process.env.TEST_ENV);
console.log("🔵 Playwright CONFIG baseURL:", ENV[process.env.TEST_ENV as EnvironmentKey] || ENV.QAT);

// if (!process.env._CONFIG_LOGGED) {
//   console.log("🔵 Playwright CONFIG TEST_ENV:", process.env.TEST_ENV);
//   console.log("🔵 Playwright CONFIG baseURL:", ENV[process.env.TEST_ENV as EnvironmentKey] || ENV.QAT);
//   process.env._CONFIG_LOGGED = "true";
// }

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
  meta: (() => ({
  'Test Cycle': 'AN_ALMGMT_V12',
  Environment: process.env.TEST_ENV,
  version: '1',
  release: 'V12',
  platform: os.type(),
}))(),

} as any;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: 'test-results',

  use: {
      baseURL: ENV[(process.env.TEST_ENV as keyof typeof ENV) || "QAT"],
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: null,         // ✅ fixes full-screen desktop
  },

  reporter: [
   // ['ortoni-report', reportConfig],
     ['html']
  ],

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,               // ✅ full screen
        deviceScaleFactor: undefined, // ✅ prevents CI error
        launchOptions: { args: ['--start-maximized'] },
      },
    },
  ],
});
