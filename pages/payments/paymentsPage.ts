import { Page, Locator, expect } from '@playwright/test';
import { CommonUtils } from '../../utils/commonUtils';

import { BasePage } from '../basePage';

export class PaymentsPage extends BasePage {
  readonly page: Page;
  readonly utils: CommonUtils;

  readonly headerTxt: Locator;
  readonly filterTable: Locator;
  readonly transactionsTable: Locator;

  readonly searchInput: Locator;    
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.utils = new CommonUtils(page);

    this.headerTxt = page.getByRole('heading', { name: /Welcome,/, exact: false });
    this.filterTable = page.locator('div.filter-container');
    this.transactionsTable = page.locator('div.table-container');

     // search input and button
  }

  async validatePaymentsPageLoaded() {
    // Wait for visibility
    await this.utils.waitForVisible(this.headerTxt, 15000);
    await this.utils.waitForVisible(this.filterTable, 15000);
    await this.utils.waitForVisible(this.transactionsTable, 15000);

  
    await expect(this.headerTxt).toBeVisible();
    await expect(this.filterTable).toBeVisible();
    await expect(this.transactionsTable).toBeVisible();
  }
}
