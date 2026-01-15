import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login/loginPage';
import { loginDataUtils } from './loginDataUtils';

export async function loginAs(page: Page, userKey: string) {
  const loginPage = new LoginPage(page);    
  const baseUrl = loginDataUtils.getAllyBaseUrl();
  const { username, password } = loginDataUtils.getAllyUser(userKey);

  await loginPage.navigateTo(baseUrl);
  await loginPage.login(username, password);
}
