import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page', () => {

  test('should load the home page with correct title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    const title = await homePage.getTitle();
    expect(title).toBe('Automation Exercise');
  });

  test('should display the site logo', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await expect(homePage.logo).toBeVisible();
  });

  test('should display navigation bar with links', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    const count = await homePage.getNavbarLinkCount();
    expect(count).toBeGreaterThan(0);
  });

});
