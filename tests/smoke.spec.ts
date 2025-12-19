import { test, expect } from '../utils/fixtures';
import { generateRandomUser } from '../utils/testData';

test.describe('ParaBank Availability', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/parabank/index.htm');
    await expect(page).toHaveTitle(/ParaBank/);
  });

  test('should load the registration page', async ({ page }) => {
    await page.goto('/parabank/register.htm');
    await expect(page.locator('input[id="customer.firstName"]')).toBeVisible();
  });
});

test.describe('User Registration', () => {
  test('should successfully register a new user', async ({ registerPage }) => {
    const userData = generateRandomUser();
    
    await registerPage.goto();
    await registerPage.register(userData);
    
    // Verify successful registration
    await expect(registerPage.successMessage).toContainText('Signing up is easy!');
  });
});

test.describe('Login', () => {
  test('should login with valid credentials', async ({ loginPage, registerPage, page }) => {
    // First register a new user
    const userData = generateRandomUser();
    await registerPage.goto();
    await registerPage.register(userData);
    
    // Logout if logged in after registration
    const logoutLink = page.locator('text=Log Out');
    if (await logoutLink.isVisible()) {
      await logoutLink.click();
    }
    
    // Now login with the registered user
    await loginPage.goto();
    await loginPage.login(userData.username, userData.password);
    
    // Verify successful login - should see welcome message or accounts overview
    await expect(page.locator('#leftPanel')).toContainText('Account Services');
  });
});

test.describe('Forgot Login', () => {
  test('should navigate to forgot login page', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.forgotLoginLink.click();
    
    // Verify we're on the forgot login page
    await expect(page.locator('h1')).toContainText('Customer Lookup');
  });

  test('should display customer lookup form', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.forgotLoginLink.click();
    
    // Verify the lookup form fields are visible
    await expect(page.locator('input[id="firstName"]')).toBeVisible();
    await expect(page.locator('input[id="lastName"]')).toBeVisible();
    await expect(page.locator('input[id="address.street"]')).toBeVisible();
    await expect(page.locator('input[id="address.city"]')).toBeVisible();
    await expect(page.locator('input[id="address.state"]')).toBeVisible();
    await expect(page.locator('input[id="address.zipCode"]')).toBeVisible();
    await expect(page.locator('input[id="ssn"]')).toBeVisible();
  });
});
