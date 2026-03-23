import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly navbarLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('img[alt="Website for automation practice"]');
    this.navbarLinks = page.locator('ul.nav.navbar-nav li');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getNavbarLinkCount(): Promise<number> {
    return this.navbarLinks.count();
  }
}
