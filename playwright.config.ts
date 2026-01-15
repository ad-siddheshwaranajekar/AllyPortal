import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { validateEnv } from './utils/envValidator';

// Load .env only for LOCAL (CI injects env vars automatically)
dotenv.config({ path: './utils/.env' });

// Default environment = QAT
const ENV = (process.env.TEST_ENV || 'QAT').toUpperCase();
process.env.TEST_ENV = ENV;

// Fail fast if env / creds / baseURL missing
validateEnv();

// Centralized base URLs
const BASE_URLS: Record<string, string> = {
  DEV: 'https://ally.dev.anddone.com',
  QAT: 'https://ally.qat.anddone.com',
  UAT: 'https://ally.uat.anddone.com',
};

const baseURL = BASE_URLS[ENV];
if (!baseURL) {
  throw new Error(`Base URL not configured for environment: ${ENV}`);
}

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  outputDir: 'test-results',

  reporter: [['html']],

  use: {
    baseURL,
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
