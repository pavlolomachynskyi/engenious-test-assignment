# Engenious University: Automated Login Test

Task 2 of the QA Engineer assessment: the login process on https://university.engenious.io/, automated with Playwright and TypeScript. The test runs in Google Chrome only.

The test is in [`tests/login.spec.ts`](tests/login.spec.ts).

## Setup

Requirements: Node.js 20 or later, and Google Chrome.

```bash
npm install
npm run install:chrome        # only if Google Chrome is not installed yet
cp .env.example .env          # on Windows: copy .env.example .env
```

**Precondition:** a user registered on Engenious University. Put its credentials in `.env`:

```dotenv
TEST_USER_EMAIL=you@example.com
TEST_USER_PASSWORD=your-password
```

The account must have finished registration, including the profile step. A user without a completed profile is sent to `/registration/create-profile` instead of the dashboard.

## Running the test

| Command | What it does |
|---------|--------------|
| `npm test` | Runs the test headless in Google Chrome |
| `npm run test:headed` | Runs the test in a visible Chrome window |
| `npm run test:ui` | Opens Playwright UI mode |
| `npm run report` | Opens the HTML report of the last run |
| `npm run typecheck` | Type-checks the project with `tsc` |

## How the test follows the test case

The test steps follow the test case in order, so the HTML report reads like the test case.

| Test case step | What the test does |
|----------------|--------------------|
| Open the Chrome browser | Playwright launches Google Chrome (`channel: 'chrome'` in `playwright.config.ts`). |
| Navigate to https://university.engenious.io/ | Opens the home page and checks that the address is exactly `/` and the **Sign in** link is shown. |
| Click on the "Sign In" button | Clicks **Sign in** and checks that `/login` shows the Email field, the Password field and the Login button. |
| Click on the "Log in" button | Selects the **Login** tab. The form is already shown after Sign in, but the test case asks for this click. |
| Enter valid login credentials (Email and Password) | Types the email and the password. |
| Click on the "Login" button | Submits the form. |
| Verify that the user is logged in | After login the site redirects to `/courses`, the user's dashboard. The test checks that URL, the personal **"*First name*'s courses"** heading, which only logged-in users see, and that the **Sign Up / Login** button is gone. |

## Design notes

- **Page Object Model** (`pages/`): each page defines its locators once, in its constructor. The test only calls page methods; the checks live in each page's `expectLoaded()`.
- **Fixtures** (`fixtures/`): the page objects and the credentials are injected into the test.
- **Cookie banner:** an automatic fixture uses `page.addLocatorHandler` to dismiss the consent dialog whenever it appears. While the dialog is open, it hides the rest of the page from role-based locators.
- **Locators:** user-facing `getByRole` locators only. No CSS classes or XPath, because the app's class names are generated at build time.
- **Waiting:** web-first assertions (`await expect(...)`) only. There are no fixed waits.
- **Secrets:** the credentials come from `.env`. Playwright writes typed values, including the password, into its HTML report and traces, so `.env`, `playwright-report/` and `test-results/` are all gitignored. Keep them out of anything you share.

## Project structure

```
tests/login.spec.ts         The automated login test
pages/                      Page objects: home, login, dashboard
fixtures/index.ts           Test fixtures: page objects, credentials, cookie banner
helpers/credentials.ts      Reads the test account from .env
playwright.config.ts        Google Chrome only, HTML report, traces on failure
```
