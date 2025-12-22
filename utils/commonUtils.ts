import { Page, Locator } from '@playwright/test';

export class CommonUtils {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ======================
  // ENV VARIABLES (STATIC)
  // ======================
  static getEnvVariable(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`❌ Environment variable "${name}" is not defined`);
    }
    return value;
  }

  // ======================
  // UI HELPERS
  // ======================
  private async highlight(locator: Locator) {
    try {
      const visible = await locator.isVisible({ timeout: 2000 }).catch(() => false);
      if (!visible) return;

      const handle = await locator.elementHandle();
      if (!handle) return;

      await this.page.evaluate((el) => {
        const original = el.getAttribute('style') || '';
        el.style.transition = 'box-shadow 0.5s ease';
        el.style.boxShadow = '0 0 15px 5px rgba(231, 12, 23, 0.9)';

        setTimeout(() => {
          el.style.boxShadow = 'none';
          el.setAttribute('style', original);
        }, 800);
      }, handle);

    } catch {
      console.warn('⚠ Highlight skipped');
    }
  }

  async click(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await this.highlight(locator);
    await locator.click();
  }

  async fill(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await this.highlight(locator);
    await locator.fill(text);
  }

  async type(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await this.highlight(locator);
    await locator.type(text);
  }

  async waitForVisible(locator: Locator, timeout = 10000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }
}
