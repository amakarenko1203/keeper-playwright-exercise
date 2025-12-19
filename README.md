# ParaBank Test Automation

End-to-end test automation for [ParaBank](https://parabank.parasoft.com/parabank) using Playwright and TypeScript.

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
npm test                    # Run all tests
npm run test:ui            # Run with UI mode
npm run test:headed        # Run in headed mode
npm run test:report        # View test report
```

## Test Coverage

### 1. User Registration (`tests/registration.spec.ts`)
- Successful registration with valid data
- Form validation for incomplete submissions
- Password mismatch handling

### 2. Authentication (`tests/authentication.spec.ts`)
- Valid credential login
- Invalid username/password rejection
- Empty credentials handling

### 3. Fund Transfer (`tests/fundTransfer.spec.ts`)
- Successful transfers between accounts
- Negative and zero amount validation
- Non-numeric input handling

### 4. Account Overview (`tests/accountOverview.spec.ts`)
- Account list display
- Balance formatting and verification
- Account details navigation

## Project Structure

```
├── pages/              # Page Object Models
├── tests/              # Test specifications
├── utils/              # Fixtures and test data generators
└── .github/workflows/  # CI/CD configuration
```

## Architecture

### Page Object Model
Encapsulates page interactions and locators for maintainability.

### Custom Fixtures
Extends Playwright test context with reusable page objects.

### Test Data
Dynamically generates unique test data to prevent conflicts.

## Configuration

- **Parallel Execution**: Tests run concurrently
- **Multi-Browser**: Chromium, Firefox, WebKit
- **Retries**: Configured for CI environments
- **Reporting**: HTML reports with screenshots and videos on failure

## CI/CD

GitHub Actions workflow runs tests on:
- Multiple Node.js versions
- All supported browsers
- Push and pull request events
