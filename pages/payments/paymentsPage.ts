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
  readonly resultsRows: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.utils = new CommonUtils(page);

    this.headerTxt = page.getByRole('heading', { name: /Welcome,/, exact: false });
    this.filterTable = page.locator('div.filter-container');
    this.transactionsTable = page.locator('div.table-container');

    this.searchInput = page.locator('#searchInput');
    this.searchButton = page.locator('#searchBtn');
    this.resultsRows = page.locator('div.table-container table tbody tr');

    

     // search input and button
  }
 async searchTransaction(text: string) {
  await this.utils.waitForVisible(this.searchInput, 10000);
  // await this.searchInput.fill(transactionId);
  // await this.searchButton.click();  
  await this.utils.waitForVisible(this.searchInput, 10000);
  await this.utils.fill(this.searchInput, text);   // highlight + fill
  await this.utils.click(this.searchButton); 
 }

 async validateSearchResultsContain(text: string) {

  await this.utils.waitForVisible(this.resultsRows.first(), 90000);
  const rowCount = await this.resultsRows.count();
  expect(rowCount).toBeGreaterThan(0);

  for (let i = 0; i < rowCount; i++) {
    const rowText = await this.resultsRows.nth(i).innerText();
    expect(rowText.toLowerCase()).toContain(text.toLowerCase());
  }
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
