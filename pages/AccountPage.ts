import { Page, Locator } from '@playwright/test';

export class AccountPage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly accountsOverviewLink: Locator;
  readonly openNewAccountLink: Locator;
  readonly transferFundsLink: Locator;
  readonly billPayLink: Locator;
  readonly findTransactionsLink: Locator;
  readonly updateContactInfoLink: Locator;
  readonly requestLoanLink: Locator;
  readonly logoutLink: Locator;
  readonly accountTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator('#leftPanel .smallText');
    this.accountsOverviewLink = page.locator('text=Accounts Overview');
    this.openNewAccountLink = page.locator('text=Open New Account');
    this.transferFundsLink = page.locator('text=Transfer Funds');
    this.billPayLink = page.locator('text=Bill Pay');
    this.findTransactionsLink = page.locator('text=Find Transactions');
    this.updateContactInfoLink = page.locator('text=Update Contact Info');
    this.requestLoanLink = page.locator('text=Request Loan');
    this.logoutLink = page.locator('text=Log Out');
    this.accountTable = page.locator('#accountTable');
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.welcomeMessage.isVisible();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async goToAccountsOverview() {
    await this.accountsOverviewLink.click();
  }

  async goToTransferFunds() {
    await this.transferFundsLink.click();
  }

  async goToOpenNewAccount() {
    await this.openNewAccountLink.click();
  }
}
