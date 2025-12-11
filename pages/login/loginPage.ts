import { Page, Locator } from "@playwright/test";
import { BasePage } from "../basePage";
import loginData from '../../testData/loginData.json';


export class LoginPage extends BasePage {   
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly url: string;           // ✅ FIXED

  constructor(page: Page) {
    super(page);

    const envKey = (process.env.TEST_ENV as EnvironmentKey) || "QAT";
    this.url = ENV[envKey];       // ✅ Now correct

    console.log("🔍 LoginPage URL =", this.url);

    this.usernameInput = page.locator('#loginUsername');
    this.passwordInput = page.locator('#loginPassword');
    this.loginButton = page.locator('#login-button');
  }

  async navigate() {
    console.log("➡ Navigating to:", this.url);
    await this.page.goto(this.url);
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
