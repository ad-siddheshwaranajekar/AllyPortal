import { Page, Locator } from '@playwright/test';

export const SortColumns = {
  Users: {
    // Username: 'th[data-column="username"]',
    // Email: 'th[data-column="email"]',
    // AuthTypes: 'th[data-column="authTypes"]',
    // Status: 'th[data-column="status"]'
    Username: '.col-title:has-text("Username")',
    Email: '.col-title:has-text("Email")',
    AuthTypes: '.col-title:has-text("Auth Types")',
    Status: '.col-title:has-text("Status")'
  },

  Payments: {
    DbaName: 'th[data-column="dbaName"]',
    ShopperName: 'th[data-column="shopperName"]',
    Method: 'th[data-column="method"]',
    AchCard: 'th[data-column="achCard"]',
    MerchantRef: 'th[data-column="merchantRef"]',
    Date: 'th[data-column="date"]',
    Status: 'th[data-column="status"]'
  },

  Webhooks: {
    Status: 'th[data-column="status"]',
    URL: 'th[data-column="url"]',
    PrivateKey: 'th[data-column="privateKey"]'
  },

  WebhookEvents: {
    URL: 'th[data-column="url"]',
    Event: 'th[data-column="event"]',
    DateTime: 'th[data-column="dateTime"]'
  }
};
export async function sortColumn(page: Page, columnSelector: string) {
  await page.locator(columnSelector).locator('xpath=..').click();
}