import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ExpectedText } from '../fixtures/testData';

test.describe('Home Page', () => {

    test('should load the home page with correct title', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        const title = await homePage.getTitle();
        expect(title).toBe(ExpectedText.homeTitle);
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
