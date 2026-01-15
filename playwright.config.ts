import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./global-setup.ts'), // ✅ use global setup
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: 'test-results',
  reporter: [['html']],
  use: {
    baseURL: process.env.TEST_ENV === 'DEV'
      ? 'https://ally.dev.anddone.com'
      : process.env.TEST_ENV === 'QAT'
      ? 'https://ally.qat.anddone.com'
      : 'https://ally.uat.anddone.com',
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
        launchOptions: { args: ['--start-maximized'] },
      },
    },
  ],
});
