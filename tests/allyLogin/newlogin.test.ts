import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/loginPage';
import loginData from '../../testData/loginData.json';
import { loginAs } from '../../utils/login.helper';
import * as dotenv from 'dotenv';
dotenv.config({ path: './config/qat.env', override: true });


test.describe('Login Module', () => {

   test.beforeEach(async ({ page }) => {
  await loginAs(page, 'ALLYQAT_A');
});

test.only('Login with valid credentials', async ({ page }) => {
  const usersHeader = page.locator("//h3[normalize-space()='Users']");
  await expect(usersHeader).toBeVisible({ timeout: 15000 });
  await expect(usersHeader).toHaveText('Users');
});

});