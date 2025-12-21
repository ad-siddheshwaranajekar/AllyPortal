import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/login/loginPage';

dotenv.config({
  path: `./config/${process.env.ENV || 'qat'}.env`,
  override: true,
});

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.loginAsAlly();

  // Save authenticated state
  await context.storageState({ path: 'auth/auth.json' });

  await browser.close();
}

export default globalSetup;
