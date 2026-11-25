import { type Locator, type Page, expect } from '@playwright/test';

/**
 * Landing page after a successful login: /courses.
 *
 * Anonymous visitors see a single "All Courses" section and a "Sign Up / Login" button.
 * Logged-in users see a personal "<First name>'s courses" section with their avatar,
 * followed by "Available courses".
 */
export class DashboardPage {
  readonly userCoursesHeading: Locator;
  readonly signUpLoginButton: Locator;

  constructor(private readonly page: Page) {
    this.userCoursesHeading = page.getByRole('heading', { level: 2, name: /'s courses$/ });
    this.signUpLoginButton = page.getByRole('button', { name: /Sign Up \/ Login/ });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL('/courses');
    await expect(this.userCoursesHeading).toBeVisible();
    await expect(this.signUpLoginButton).toBeHidden();
  }
}
