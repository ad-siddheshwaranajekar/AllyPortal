import { Page, Locator, expect } from '@playwright/test';
import { CommonUtils } from '../../utils/commonUtils';
import { BasePage } from '../basePage';

export class UsersPage extends BasePage {
  readonly page: Page;
  readonly utils: CommonUtils;

  // Page structure
  readonly usersHeader: Locator;
  readonly userFilterContainer: Locator;
  readonly usersTableContainer: Locator;

  // Search
  readonly searchBox: Locator;
  readonly seaButton: Locator;
  readonly clearButton: Locator;
  readonly noResultsFound: Locator;
  readonly userRows: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.utils = new CommonUtils(page);

    // Page structure
    this.usersHeader = page.locator("//h3[normalize-space()='Users']");
    this.userFilterContainer = page.locator('div.filter-container');
    this.usersTableContainer = page.locator('div.table-container');

    // Search
    this.searchBox = page.locator('#searchInput');
    this.seaButton = page.locator('#searchBtn');
    this.clearButton = page.locator('.button.button-clear');
    this.noResultsFound = page.locator('h3').filter({ hasText: 'No Results Found' }).first();
    this.userRows = page.locator('div.table-container table tbody tr');
  }

  // Validate initial page load
  async validateUsersPageLoaded() {
    await this.utils.waitForVisible(this.usersHeader, 15000);
    await this.utils.waitForVisible(this.userFilterContainer, 15000);
    await this.utils.waitForVisible(this.usersTableContainer, 15000);

    await expect(this.usersHeader).toBeVisible();
    await expect(this.userFilterContainer).toBeVisible();
    await expect(this.usersTableContainer).toBeVisible();
  }

  // Search user
  async searchUser(username: string) {
    await this.searchBox.fill(username);
    await this.seaButton.click();

    // Wait for either rows or "No Results Found"
    await Promise.race([
      this.userRows.first().waitFor({ state: 'visible', timeout: 8000 }).catch(() => {}),
      this.noResultsFound.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {})
    ]);
  }

  // Validate search results
  async validateSearchResults(username: string) {
    if (await this.noResultsFound.isVisible()) {
      console.log(`✔ No results found for "${username}"`);
      return;
    }

    const rowCount = await this.userRows.count();
    if (rowCount === 0) {
      throw new Error(`❌ No table rows found after searching for "${username}"`);
    }

    for (let i = 0; i < rowCount; i++) {
      const usernameCell = this.userRows.nth(i).locator('td').nth(0);
      const text = (await usernameCell.innerText()).trim();

      if (!text.toLowerCase().includes(username.toLowerCase())) {
        throw new Error(
          `❌ Username mismatch in row ${i + 1}
Expected: "${username}"
Found: "${text}"`
        );
      }
    }

    console.log(`✔ All ${rowCount} rows match username: "${username}"`);
  }

  // Clear search
  async clearSearch() {
    await this.utils.waitForVisible(this.clearButton, 10000);
    await this.utils.click(this.clearButton);

    // Wait for table to refresh (NO hard waits)
    await this.page.waitForSelector(
      'div.table-container table tbody tr',
      { state: 'visible', timeout: 15000 }
    );
  }

  // Validate full records loaded after clearing filter
  async validateAllRecordsLoaded() {
    const rowCount = await this.userRows.count();

    if (rowCount < 2) {
      throw new Error(`❌ Expected all user records, but only found ${rowCount}`);
    }

    console.log(`✔ Table reloaded with ${rowCount} users`);
  }
}
