// utils/commonUtils.ts
import { Page, Locator } from '@playwright/test';

export class CommonUtils {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 🔥 highlight logic
  private async highlight(locator: Locator) {
    const handle = await locator.elementHandle();
    if (!handle) return;

    await this.page.evaluate((el) => {
      const originalOutline = el.style.outline;

      el.style.outline = "9px solid green";
      el.style.transition = "outline 0.9s ease";

      setTimeout(() => {
        el.style.outline = originalOutline;
      }, 900);
    }, handle);
  }

  async click(locator: Locator) {
    await this.highlight(locator);
    await locator.click();
  }

  async fill(locator: Locator, text: string) {
    await this.highlight(locator);
    await locator.fill(text);
  }

  async type(locator: Locator, text: string) {
    await this.highlight(locator);
    await locator.type(text);
  }

  async waitForVisible(locator: Locator, timeout?: number) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }
}
