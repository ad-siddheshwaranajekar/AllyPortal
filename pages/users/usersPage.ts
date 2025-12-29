import { Locator, Page, expect } from "@playwright/test";
import { commonUtils, BasePage } from '@siddheshwar.anajekar/common-base';

export class UsersPage extends BasePage {
  readonly utils: commonUtils;

  readonly usersHeader: Locator;
  readonly userFilterContainer: Locator;
  readonly usersTableContainer: Locator;

  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly clearButton: Locator;
  readonly noResultsFound: Locator;

  readonly userRows: Locator;

  constructor(page: Page) {
    super(page);
    this.utils = new commonUtils(this.page);

    this.usersHeader = page.locator("//h3[normalize-space()='Users']");
    this.userFilterContainer = page.locator('div.filter-container');
    this.usersTableContainer = page.locator('div.table-container');

    this.searchBox = page.locator('#searchInput');
    this.searchButton = page.locator('#searchBtn');
    this.clearButton = page.locator('.button.button-clear');

    this.noResultsFound = page.locator('h3', { hasText: 'No Results Found' }).first();
    this.userRows = page.locator('div.table-container table tbody tr');
  }

  firstRow(): Locator {
    return this.userRows.first();
  }

  getStatusCell(row: Locator): Locator {
    return row.locator('td').nth(3);
  }

  async getStatus(row: Locator): Promise<string> {
    return (await this.getStatusCell(row).innerText()).trim();
  }

  async openActionMenu(row: Locator): Promise<Locator> {
    try {
      const openMenu = this.page.locator("ul.dropdown-menu.show");
      if (await openMenu.isVisible()) {
        await this.page.click("body");
        await expect(openMenu).toBeHidden();
      }
    } catch {}

    const menuTrigger = row.locator("span").filter({ hasText: "" }).first();
    await menuTrigger.click();
    const menu = row.locator("ul.dropdown-menu.show");
    await expect(menu).toBeVisible({ timeout: 5000 });
    return menu;
  }

  async clickAction(row: Locator, action: "Activate" | "Deactivate") {
    const menu = await this.openActionMenu(row);
    const actionButton = menu.getByRole("listitem", { name: action });
    await expect(actionButton).toBeVisible({ timeout: 5000 });
    await actionButton.click();

    const expectedToast =
      action === "Activate" ? "User activated successfully." : "User deactivated successfully.";
    const toastLocator = this.page.getByRole('alert', { name: expectedToast });
    await toastLocator.waitFor({ state: 'visible', timeout: 10000 });
    await expect(toastLocator).toBeVisible();
  }

  async deactivateFirstActiveUser() {
    const row = this.firstRow();
    if ((await this.getStatus(row)) === "Active") {
      await this.clickAction(row, "Deactivate");
    } else {
      console.log("✔ First row is not active, skipping deactivate action");
    }
  }

  async validateUsersPageLoaded() {
    await this.utils.waitForVisible(this.usersHeader);
    await this.utils.waitForVisible(this.userFilterContainer);
    await this.utils.waitForVisible(this.usersTableContainer);
  }

  async searchUser(username: string) {
    await this.utils.fill(this.searchBox, username);
    await this.utils.click(this.searchButton);
    await Promise.race([
      this.userRows.first().waitFor({ state: 'visible' }).catch(() => {}),
      this.noResultsFound.waitFor({ state: 'visible' }).catch(() => {})
    ]);
  }

  async validateSearchResults(username: string) {
    if (await this.noResultsFound.isVisible()) return;

    const count = await this.userRows.count();
    for (let i = 0; i < count; i++) {
      const cell = (await this.userRows.nth(i).locator("td").nth(0).innerText()).trim();
      if (!cell.toLowerCase().includes(username.toLowerCase())) {
        throw new Error(`Row ${i + 1} mismatch: expected ${username}, found ${cell}`);
      }
    }
  }

  async clearSearch() {
    await this.utils.click(this.clearButton);
    await this.firstRow().waitFor({ state: 'visible' });
  }
}
