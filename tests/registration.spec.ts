import { test, expect } from '../utils/fixtures';
import { generateRandomUser } from '../utils/testData';

test.describe('User Registration', () => {
  test('should successfully register a new user with valid information', async ({ 
    page, 
    registerPage 
  }) => {
    const userData = generateRandomUser();

    await registerPage.goto();
    await expect(page).toHaveTitle(/ParaBank.*Register/);

    await registerPage.register(userData);

    await expect(registerPage.successMessage).toContainText(
      'Your account was created successfully',
      { timeout: 10000 }
    );

    await expect(page.locator('.smallText')).toContainText(`Welcome ${userData.firstName}`);
  });

  test('should display validation errors for incomplete registration', async ({ 
    registerPage 
  }) => {
    await registerPage.goto();
    await registerPage.registerButton.click();
    await expect(registerPage.errorMessage.first()).toBeVisible();
  });

  test('should prevent registration with mismatched passwords', async ({ 
    registerPage 
  }) => {
    const userData = generateRandomUser();
    await registerPage.goto();
    await registerPage.firstNameInput.fill(userData.firstName);
    await registerPage.lastNameInput.fill(userData.lastName);
    await registerPage.addressInput.fill(userData.address);
    await registerPage.cityInput.fill(userData.city);
    await registerPage.stateInput.fill(userData.state);
    await registerPage.zipCodeInput.fill(userData.zipCode);
    await registerPage.phoneInput.fill(userData.phone);
    await registerPage.ssnInput.fill(userData.ssn);
    await registerPage.usernameInput.fill(userData.username);
    await registerPage.passwordInput.fill(userData.password);
    await registerPage.confirmPasswordInput.fill('DifferentPassword123!');
    await registerPage.registerButton.click();

    await expect(registerPage.errorMessage).toContainText('Passwords did not match');
  });
});
