import { test, expect } from '../utils/fixtures';
import { generateRandomUser } from '../utils/testData';

test.describe('User Authentication', () => {
  let testUser: ReturnType<typeof generateRandomUser>;

  test.beforeEach(async ({ registerPage, accountPage }) => {
    testUser = generateRandomUser();
    await registerPage.goto();
    await registerPage.register(testUser);
    
    await expect(registerPage.successMessage).toContainText(
      'Your account was created successfully',
      { timeout: 10000 }
    );
    
    await accountPage.logout();
  });

  test('should successfully login with valid credentials', async ({ 
    loginPage, 
    accountPage 
  }) => {
    await loginPage.goto();
    await loginPage.login(testUser.username, testUser.password);

    await expect(accountPage.welcomeMessage).toContainText(
      `Welcome ${testUser.firstName} ${testUser.lastName}`,
      { timeout: 10000 }
    );

    await accountPage.goToAccountsOverview();
    await expect(accountPage.accountTable).toBeVisible({ timeout: 10000 });
  });

  test('should reject login with invalid username', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invaliduser123456', 'anypassword');

    await expect(loginPage.errorMessage).toContainText('error', {
      ignoreCase: true,
      timeout: 10000
    });
  });

  test('should reject login with incorrect password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(testUser.username, 'WrongPassword123!');

    await expect(loginPage.errorMessage).toContainText('error', {
      ignoreCase: true,
      timeout: 10000
    });
  });

  test('should reject login with empty credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible({ timeout: 10000 });
  });
});
