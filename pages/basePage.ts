// pages/basePage.ts
import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Click on any locator
  async click(locator: Locator) {
    await locator.click();
  }

  // Fill input fields
  async fill(locator: Locator, text: string) {
    await locator.fill(text);
  }

  // Wait until element is visible (optional custom timeout)
  async waitForVisible(locator: Locator, timeout?: number) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  // Get text from a locator
  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }

  // Navigate to a URL without hardcoded timeout
  async navigateTo(url: string) {
    console.log('Navigating to:', url);
    // Use 'domcontentloaded' to avoid SPA networkidle issues
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}
