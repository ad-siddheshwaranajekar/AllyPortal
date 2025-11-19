// pages/basePage.ts
import { Page, Locator } from '@playwright/test';
import { CommonUtils } from '../utils/commonUtils';

export class BasePage {
  readonly page: Page;
  readonly utils: CommonUtils;

  constructor(page: Page) {
    this.page = page;
    this.utils = new CommonUtils(page);
  }

  // ⭐ Updated click with auto-highlight
  async click(locator: Locator) {
    await this.utils.click(locator);
  }

  // ⭐ Updated fill with auto-highlight
  async fill(locator: Locator, text: string) {
    await this.utils.fill(locator, text);
  }

  // ⭐ Optional: type() with auto-highlight
  async type(locator: Locator, text: string) {
    await this.utils.type(locator, text);
  }

  // Wait until element is visible
  async waitForVisible(locator: Locator, timeout?: number) {
    await this.utils.waitForVisible(locator, timeout);
  }

  // Get text
  async getText(locator: Locator): Promise<string> {
    return this.utils.getText(locator);
  }

  // Navigate to a URL
  async navigateTo(url: string) {
    console.log('Navigating to:', url);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}
