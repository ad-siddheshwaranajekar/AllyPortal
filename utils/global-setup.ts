import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
  path: `./config/${process.env.ENV || 'qat'}.env`,
  override: true,
});

export default async function globalSetup() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to login page
  await page.goto(process.env.BASE_URL!);

  // Wait for login form
  await page.fill('#loginUsername', process.env.USERNAME!);
  await page.fill('#loginPassword', process.env.PASSWORD!);

  await page.waitForSelector('#login-button', { state: 'visible', timeout: 10000 });
  await page.click('#login-button');

  // Wait for post-login URL
  await page.waitForURL(/#\/ally\/users/, { timeout: 30000 });

  // Wait for dashboard element to ensure page fully loaded
  await page.waitForSelector('div.header', { timeout: 10000 });

  // Ensure localStorage has auth
  await page.waitForFunction(() => localStorage.length > 0);

  // Save auth state
  await context.storageState({ path: 'auth/auth.json' });

  await browser.close();
}
