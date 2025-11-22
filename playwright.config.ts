import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  //  Existing HTML report + Allure added
  reporter: [
    ['html'],                   // existing
    ['allure-playwright']       // ⭐ Allure report adapter
  ],

  use: {
    trace: 'on-first-retry',
    viewport: null,
    // optional but useful for Allure:
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },

    // Edge project kept commented as you had it
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //     viewport: null,
    //     deviceScaleFactor: undefined,
    //     launchOptions: {
    //       args: ['--start-maximized'],
    //     },
    //   },
    // },
  ],
});
