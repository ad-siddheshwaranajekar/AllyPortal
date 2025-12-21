import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../basePage';
import { CommonUtils } from '../../utils/commonUtils';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logo: Locator;
  readonly forgotPassword: Locator;
  readonly recoverPasswordText: Locator;
  readonly usernameForResetPasswordInput: Locator;
  readonly alertMessage: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  readonly url: string;

  constructor(page: Page) {
    super(page);

    this.url = process.env.BASE_URL!;

    this.usernameInput = page.locator('#loginUsername');
    this.passwordInput = page.locator('#loginPassword');
    this.loginButton = page.locator('#login-button');
    this.logo = page.locator("img.anddone-logo");
    this.forgotPassword = page.locator("text=Forgot Password?");
    this.recoverPasswordText = page.locator("text=Recover Password");
    this.usernameForResetPasswordInput = page.locator('#userEmail');
    this.alertMessage = page.locator('text=User Name is invalid');
    this.submitButton = page.locator('.button.button-green');
    this.successMessage = page.locator('.toast-success');
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    
  }

  async loginAsAlly() {
    await this.login(
      CommonUtils.getEnvVariable('USERNAME'),
      CommonUtils.getEnvVariable('PASSWORD')
    );
  }

  async navigateToForgotPassword() {
    await this.navigate();
    await this.forgotPassword.click();
    await expect(this.recoverPasswordText).toBeVisible();
  }
}
