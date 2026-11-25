import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
  readonly loginTab: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.loginTab = page.getByRole('link', { name: 'Login', exact: true });
    this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true });
    this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL('/login');
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async clickLoginTab() {
    await this.loginTab.click();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }
}
