import { Page, Locator } from '@playwright/test';
import { commonUtils } from '@siddheshwar.anajekar/common-base';
import { th } from '@faker-js/faker';

export class SideMenuPage {
  readonly page: Page;
  readonly utils: commonUtils;

  readonly usersMenu: Locator;
  readonly paymentsMenu: Locator; 
  readonly webhooksMenu: Locator;
  readonly webhookEventLogsMenu: Locator;
  readonly profileMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.utils = new commonUtils(page);  // ✅ FIX

    //this.usersMenu = page.getByRole('link', { name: 'Users' });
    this.paymentsMenu = page.getByRole('link', { name: 'Payments' });
    this.webhooksMenu = page.getByRole('link', { name: 'Webhooks' });
    this.webhookEventLogsMenu = page.getByRole('link', { name: 'Webhook Events' });
    this.profileMenu = page.locator('p.profile-name');
    this.usersMenu = page.locator('a[href="#/ally/users"]');
  }



   private async delay() {
  await this.page.waitForTimeout(1000); // 3 sec
}
  // async openUsers() {
  //   await this.utils.click(this.usersMenu); 
  //   await this.delay();  // now works
  // }


async openUsers() {
  await this.usersMenu.waitFor({ state: 'visible', timeout: 20000 });
  await this.usersMenu.click();
}


  async openPayments() {
    await this.utils.click(this.paymentsMenu);
    await this.page.waitForTimeout(1000); 
    //await this.delay(); 
  } 

  async openWebhooks() {
    await this.utils.click(this.webhooksMenu);
    await this.page.waitForTimeout(1000); 
    }
  async openWebhookEventLogs() {
    await this.utils.click(this.webhookEventLogsMenu);
  }
  async openProfile() {
    await this.utils.click(this.profileMenu);
  }
}





    

