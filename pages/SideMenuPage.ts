import { Page, Locator } from '@playwright/test';
import { CommonUtils } from '../utils/commonUtils';

export class SideMenuPage {
  readonly page: Page;
  readonly utils: CommonUtils;

  readonly usersMenu: Locator;
  readonly webhooksMenu: Locator;
  readonly webhookEventLogsMenu: Locator;
  readonly profileMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.utils = new CommonUtils(page);  // ✅ FIX

    this.usersMenu = page.getByRole('link', { name: 'Users' });
    this.webhooksMenu = page.getByRole('link', { name: 'Webhooks' });
    this.webhookEventLogsMenu = page.getByRole('link', { name: 'Webhook Events' });
    this.profileMenu = page.locator('p.profile-name');
  }

  async openUsers() {
    await this.utils.click(this.usersMenu);   // now works
  }

  async openWebhooks() {
    await this.utils.click(this.webhooksMenu);
  }
}





    

