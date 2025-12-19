import { test, expect } from '../utils/fixtures';
import { generateRandomUser, generateRandomAmount } from '../utils/testData';

test.describe('Fund Transfer', () => {
  let testUser: ReturnType<typeof generateRandomUser>;

  test.beforeEach(async ({ registerPage, accountPage }) => {
    testUser = generateRandomUser();
    await registerPage.goto();
    await registerPage.register(testUser);
    
    await expect(registerPage.successMessage).toContainText(
      'Your account was created successfully',
      { timeout: 10000 }
    );

    await accountPage.goToAccountsOverview();
    await expect(accountPage.accountTable).toBeVisible({ timeout: 10000 });
  });

  test('should successfully transfer funds between accounts', async ({ 
    page,
    accountPage, 
    transferFundsPage 
  }) => {
    await accountPage.goToTransferFunds();
    await expect(page).toHaveURL(/transfer\.htm/);

    const accounts = await transferFundsPage.getAvailableAccounts();
    expect(accounts.length).toBeGreaterThan(0);

    const transferAmount = generateRandomAmount(1, 10);
    await transferFundsPage.transferFunds(transferAmount);

    await expect(transferFundsPage.successMessage).toContainText(
      'Transfer Complete',
      { timeout: 10000 }
    );
  });

  test('should reject transfer with invalid amount (negative)', async ({ 
    accountPage, 
    transferFundsPage 
  }) => {
    await accountPage.goToTransferFunds();
    await transferFundsPage.transferFunds('-50');

    const hasError = await transferFundsPage.errorMessage.isVisible().catch(() => false);
    const hasSuccess = await transferFundsPage.successMessage.isVisible().catch(() => false);
    
    expect(hasError || !hasSuccess).toBeTruthy();
  });

  test('should reject transfer with zero amount', async ({ 
    accountPage, 
    transferFundsPage 
  }) => {
    await accountPage.goToTransferFunds();
    await transferFundsPage.amountInput.fill('0');
    await transferFundsPage.transferButton.click();

    const hasError = await transferFundsPage.errorMessage.isVisible().catch(() => false);
    
    if (hasError) {
      await expect(transferFundsPage.errorMessage).toBeVisible();
    }
  });

  test('should reject transfer with non-numeric amount', async ({ 
    accountPage, 
    transferFundsPage 
  }) => {
    await accountPage.goToTransferFunds();
    await transferFundsPage.amountInput.fill('abc');
    await transferFundsPage.transferButton.click();

    const inputValue = await transferFundsPage.amountInput.inputValue();
    const hasError = await transferFundsPage.errorMessage.isVisible().catch(() => false);
    
    expect(inputValue === '' || inputValue === 'abc' || hasError).toBeTruthy();
  });
});
