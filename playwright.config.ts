import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    viewport: null, // responsive
  },

 projects: [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      viewport: null,               // responsive mode
      deviceScaleFactor: undefined, // required when viewport=null
      launchOptions: {
        args: ['--start-maximized'], // ✅ makes real browser window full screen
      },
    },
  },

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
