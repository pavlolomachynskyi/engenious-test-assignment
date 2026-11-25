import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
  readonly signInLink: Locator;

  constructor(private readonly page: Page) {
    this.signInLink = page.getByRole('link', { name: 'Sign in', exact: true });
  }

  async goto() {
    await this.page.goto('/');
  }

  // page.goto() also succeeds on an error page, so check that the home page really rendered.
  async expectLoaded() {
    await expect(this.page).toHaveURL('/');
    await expect(this.signInLink).toBeVisible();
  }

  async clickSignIn() {
    await this.signInLink.click();
  }
}
