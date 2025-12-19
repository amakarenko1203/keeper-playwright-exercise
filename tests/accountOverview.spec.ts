import { test, expect } from '../utils/fixtures';
import { generateRandomUser } from '../utils/testData';

test.describe('Account Overview', () => {
  let testUser: ReturnType<typeof generateRandomUser>;

  test.beforeEach(async ({ registerPage }) => {
    testUser = generateRandomUser();
    await registerPage.goto();
    await registerPage.register(testUser);
    
    await expect(registerPage.successMessage).toContainText(
      'Your account was created successfully',
      { timeout: 10000 }
    );
  });

  test('should display accounts overview with default account', async ({ 
    page,
    accountPage 
  }) => {
    await accountPage.goToAccountsOverview();
    await expect(page).toHaveURL(/overview\.htm/);

    await expect(accountPage.accountTable).toBeVisible({ timeout: 10000 });

    const headers = page.locator('#accountTable thead th');
    await expect(headers.first()).toBeVisible();

    const accountRows = page.locator('#accountTable tbody tr');
    const rowCount = await accountRows.count();
    expect(rowCount).toBeGreaterThanOrEqual(1);
  });

  test('should display account numbers in correct format', async ({ 
    page,
    accountPage 
  }) => {
    await accountPage.goToAccountsOverview();

    const firstAccountLink = page.locator('#accountTable tbody tr:first-child td:first-child a');
    await expect(firstAccountLink).toBeVisible({ timeout: 10000 });
    
    const accountNumber = await firstAccountLink.textContent();
    
    expect(accountNumber).toBeTruthy();
    expect(accountNumber?.length).toBeGreaterThan(0);
  });

  test('should display account balances', async ({ 
    page,
    accountPage 
  }) => {
    await accountPage.goToAccountsOverview();

    const balanceCell = page.locator('#accountTable tbody tr:first-child td:nth-child(2)');
    await expect(balanceCell).toBeVisible({ timeout: 10000 });
    
    const balance = await balanceCell.textContent();
    
    expect(balance).toBeTruthy();
    expect(balance).toMatch(/\$[\d,]+\.\d{2}/);
  });

  test('should display total balance', async ({ 
    page,
    accountPage 
  }) => {
    await accountPage.goToAccountsOverview();

    const totalBalance = page.locator('#accountTable tfoot .ng-binding');
    
    if (await totalBalance.count() > 0) {
      await expect(totalBalance.first()).toBeVisible();
      const total = await totalBalance.first().textContent();
      expect(total).toMatch(/\$[\d,]+\.\d{2}/);
    }
  });

  test('should navigate to account details when clicking account number', async ({ 
    page,
    accountPage 
  }) => {
    await accountPage.goToAccountsOverview();

    const firstAccountLink = page.locator('#accountTable tbody tr:first-child td:first-child a');
    await expect(firstAccountLink).toBeVisible({ timeout: 10000 });
    
    await firstAccountLink.click();

    await expect(page).toHaveURL(/activity\.htm/);
    
    const accountDetails = page.locator('#accountDetails');
    await expect(accountDetails).toBeVisible({ timeout: 10000 });
  });

  test('should display account activity table', async ({ 
    page,
    accountPage 
  }) => {
    await accountPage.goToAccountsOverview();

    const firstAccountLink = page.locator('#accountTable tbody tr:first-child td:first-child a');
    await firstAccountLink.click();

    const activityTable = page.locator('#transactionTable');
    
    const tableExists = await activityTable.count() > 0;
    expect(tableExists).toBeTruthy();
  });
});
