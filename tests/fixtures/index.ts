import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { getCredentials, type Credentials } from '../helpers/credentials';

type Fixtures = {
  cookieConsent: void;
  homePage: HomePage;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  credentials: Credentials;
};

export const test = base.extend<Fixtures>({
  // The site shows a cookie consent dialog that hides the rest of the page from
  // assistive tech (and therefore from role locators) until it is answered.
  // Dismiss it whenever it appears so it never blocks a test step.
  cookieConsent: [
    async ({ page }, use) => {
      const consentDialog = page.getByRole('dialog').filter({ hasText: 'We value your privacy' });
      await page.addLocatorHandler(consentDialog, async () => {
        await consentDialog.getByRole('button', { name: 'Essential only' }).click();
      });
      await use();
    },
    { auto: true },
  ],

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  // The registered test account, read from .env.
  credentials: async ({}, use) => {
    await use(getCredentials());
  },
});

export { expect };
