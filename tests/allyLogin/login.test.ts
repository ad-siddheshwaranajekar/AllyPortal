import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/loginPage';

test.describe('Login Module', () => {

  // Positive test - valid credentials (Smoke)
  test('Login with valid credentials @smoke', async ({ page }) => {
    test.setTimeout(70000); // Entire test timeout

    const loginPage = new LoginPage(page);

    // Navigate to login page (QA or UAT)
    await loginPage.navigate();

    // Perform login
    await loginPage.login('JordanDavis77', '123#Qwertyuiop');

    // Users page validation
    const usersHeader = page.locator("//h3[normalize-space()='Users']");
    await expect(usersHeader).toBeVisible({ timeout: 15000 });
    await expect(usersHeader).toHaveText('Users');
  });

  // Negative test - invalid credentials (Regression)
  test('Login with invalid credentials @regression', async ({ page }) => {
    test.setTimeout(60000); // Entire test timeout

    const loginPage = new LoginPage(page);

    // Navigate to login page (QA or UAT)
    await loginPage.navigate();

    // Perform login with wrong credentials
    await loginPage.login('invalidUser', 'wrongPass');

    // Validate error alert
    const errorAlert = page.locator(
      "//div[@role='alert' and @aria-label='We could not log you in. Please check your credentials and try again.']"
    );

    await expect(errorAlert).toBeVisible({ timeout: 15000 });
    await expect(errorAlert).toHaveText(
      'We could not log you in. Please check your credentials and try again.'
    );

    
  });

});
