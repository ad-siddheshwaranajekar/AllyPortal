// pages/login/loginPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../basePage";
import { ENV, EnvironmentKey } from "../../tests/config/env";
import loginData from '../../testData/loginData.json';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.locator('#loginUsername');
    this.passwordInput = page.locator('#loginPassword');
    this.loginButton = page.locator('#login-button');
  }

  async navigate() {
    const envKey = (process.env.TEST_ENV as EnvironmentKey) || "QAT";
    const url = ENV[envKey];
    console.log("🔍 LoginPage navigating to:", url);
    await super.navigate(url); // Pass URL to BasePage
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.page.waitForTimeout(1000);
  }

  async loginAsAlly() {
    await this.login(loginData[0].username, loginData[0].password);
  }
}
