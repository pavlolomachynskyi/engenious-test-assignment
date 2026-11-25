import { test } from './fixtures';

// Task 2: Automate the login process on Engenious University.
// Precondition: a registered user (credentials in .env). Chrome only.
// "Open the Chrome browser" is not a step: Playwright opens Chrome before the test starts.
test('User can sign in with valid credentials', async ({
  homePage,
  loginPage,
  dashboardPage,
  credentials,
}) => {
  await test.step('Open the Engenious University homepage', async () => {
    await homePage.goto();
    await homePage.expectLoaded();
  });

  await test.step('Click on the "Sign In" button', async () => {
    await homePage.clickSignIn();
    await loginPage.expectLoaded();
  });

  await test.step('Select the Login tab', async () => {
    await loginPage.clickLoginTab();
    await loginPage.expectLoaded();
  });

  await test.step('Enter valid login credentials (Email and Password)', async () => {
    await loginPage.fillEmail(credentials.email);
    await loginPage.fillPassword(credentials.password);
  });

  await test.step('Click on the "Login" button', async () => {
    await loginPage.submit();
  });

  await test.step('Verify that the user is logged in and redirected to the dashboard', async () => {
    // Only signed-in users see the personal "<First name>'s courses" heading.
    await dashboardPage.expectLoaded();
  });
});
