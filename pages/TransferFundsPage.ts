import { Page, Locator } from '@playwright/test';

export class TransferFundsPage {
  readonly page: Page;
  readonly amountInput: Locator;
  readonly fromAccountSelect: Locator;
  readonly toAccountSelect: Locator;
  readonly transferButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amountInput = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect = page.locator('#toAccountId');
    this.transferButton = page.locator('input[value="Transfer"]');
    this.successMessage = page.locator('#showResult h1');
    this.errorMessage = page.locator('.error');
  }

  async goto() {
    await this.page.goto('/transfer.htm');
  }

  async transferFunds(amount: string, fromAccount?: string, toAccount?: string) {
    await this.amountInput.fill(amount);
    if (fromAccount) {
      await this.fromAccountSelect.selectOption(fromAccount);
    }
    if (toAccount) {
      await this.toAccountSelect.selectOption(toAccount);
    }
    await this.transferButton.click();
  }

  async getAvailableAccounts(): Promise<string[]> {
    const options = await this.fromAccountSelect.locator('option').allTextContents();
    return options;
  }
}
