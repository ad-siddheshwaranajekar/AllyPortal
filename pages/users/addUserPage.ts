import { Page, Locator } from "@playwright/test";

import { BasePage } from '@siddheshwar.anajekar/common-base';
 // should print [class BasePage]


export class AddUserPage extends BasePage {
  readonly page: Page;   
  readonly url: string;

  // Locators
  readonly AddUserBtn: Locator;
  readonly AddUserTxt: Locator;
  readonly userNameTxt: Locator;
  readonly basicAuthBtn: Locator;
  readonly apiKeyBtn: Locator;
  readonly firstNameInputBox: Locator;
  readonly lastNameInputBox: Locator;
  readonly phoneNumberInputBox: Locator;
  readonly emailInputBox: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly successAlert: Locator;
  readonly errorAlert: Locator;
  readonly actionButton: Locator;
  readonly deactivateButton: Locator;
  readonly activateButton: Locator;
  readonly tableRows: Locator;
  readonly firstRow: Locator;
  readonly firstRowEllipsis: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;  
    this.url = '/#/ally/users';

    this.AddUserBtn = this.page.locator("//div[@class='header']//div[@class='button button-green']");
    this.AddUserTxt = this.page.getByText('Add User', { exact: true });
    this.userNameTxt = this.page.getByRole('textbox', { name: '*Username' });
    this.basicAuthBtn = this.page.locator("//label[@for='basicAuth']");
    this.apiKeyBtn = this.page.locator("//label[@for='apiKey']");
    this.firstNameInputBox = this.page.locator('#inputFirstName');
    this.lastNameInputBox = this.page.locator('#input-name');
    this.phoneNumberInputBox = this.page.locator('#inputPhone');
    this.emailInputBox = this.page.locator('#inputEmail');
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.cancelButton = this.page.locator(':text("CANCEL")');
    this.successAlert = this.page.getByRole('alert', { name: 'User added successfully, Please continue to activate user.' });
    this.errorAlert = this.page.locator(".toast-message", { hasText: "User name already exists" });
    this.actionButton = this.page.locator('button.action-button');
    this.deactivateButton = this.page.locator(':text("Deactivate")');
    this.activateButton = this.page.locator(':text("Activate")');
    this.tableRows = this.page.locator('div.table-container table tbody tr');
    this.firstRow = this.tableRows.first();
    this.firstRowEllipsis = this.firstRow.locator('span.material-symbols-outlined');
  }

  async navigate() {
    await this.page.goto(this.url);
  }
}
