import { Page, Locator, expect } from '@playwright/test';

export class PaymentWidgetPage {
  readonly page: Page;

  // method Locators
  readonly paymentMethodHeader: Locator;
 readonly achOption: Locator;
  readonly cardOption: Locator;
 //bank details
  readonly accountHolderNameInput: Locator;
  readonly bankRoutingNumberInput: Locator;
  readonly bankAccountNumberInput: Locator;
  readonly verifyBankAccountNumberInput: Locator;
//card details


  readonly submitPaymentButton: Locator;
  readonly SueccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Payment method options
    this.paymentMethodHeader = page.locator(`span:has-text("Payment Method")`);
    this.achOption = page.locator("//div[@class='paySelect select pointerNone']//*[name()='svg']");
    this.cardOption = page.getByText('CARD', { exact: true });

    // Bank details inputs
    this.accountHolderNameInput = page.locator("//input[@id='accountHolderName']");
    this.bankRoutingNumberInput = page.locator("//input[@id='verifyBankRoutingNumberInput']");
    this.bankAccountNumberInput = page.locator("//input[@id='bankAccountNumberInput']");
    this.verifyBankAccountNumberInput = page.locator("//input[@id='verifyBankAccountNumberInput']");

    //Card deatils inputs

    // Submit button
    this.submitPaymentButton = page.getByRole('button', { name: 'Submit Payment' });

    // Toast message
    this.SueccessMessage= page.locator(`span:has-text("Thank you for your payment!")`);
  }
  async verifyPageLoaded() {
    await expect(this.paymentMethodHeader).toBeVisible();
    await expect(this.achOption).toBeVisible();
  }

  async selectACH() {
    await this.achOption.click();
  }

  async fillBankDetails(details: { accountHolder: string; routingNumber: string; accountNumber: string }) {
    await this.accountHolderNameInput.fill(details.accountHolder);
    await this.bankRoutingNumberInput.fill(details.routingNumber);
    await this.bankAccountNumberInput.fill(details.accountNumber);
    await this.verifyBankAccountNumberInput.fill(details.accountNumber);
  }

  async submitPayment() {
    await this.submitPaymentButton.click();
  }

  async verifySuccessMessage(expectedText: string) {
    await expect(this.SueccessMessage).toHaveText(expectedText);
  }
}
