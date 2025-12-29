import { Page, Locator, expect } from '@playwright/test';
import { BasePage, commonUtils } from '@siddheshwar.anajekar/common-base';


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
    this.logo = page.locator('img.anddone-logo');
    this.forgotPassword = page.locator('text=Forgot Password?');
    this.recoverPasswordText = page.locator('text=Recover Password');
    this.usernameForResetPasswordInput = page.locator('#userEmail');
    this.alertMessage = page.locator('text=User Name is invalid');
    this.submitButton = page.locator('.button.button-green');
    this.successMessage = page.locator('.toast-success');
  }

  /** Navigate to login page */
  async navigate() {
    await this.navigateTo(this.url); // Uses BasePage.navigateTo
  }

  /** Fill credentials and click login */
  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  /** Login using portal env variables */
  async loginAsAlly() {
    await this.login(
      commonUtils.getEnv('USERNAME'),
      commonUtils.getEnv('PASSWORD')
    );
  }

  /** Forgot password flow */
  async navigateToForgotPassword() {
    await this.navigate();
    await this.click(this.forgotPassword);
    await expect(this.recoverPasswordText).toBeVisible();
  }
}
