import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Products Page', () => {

    test('should load all products page', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.navigate();
        await expect(page).toHaveURL(/.*products/);
        const count = await productsPage.getProductCount();
        expect(count).toBeGreaterThan(0);
    });

    test('should search for a product and return results', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.navigate();
        await productsPage.searchProduct('dress');
        await expect(productsPage.searchedProductsTitle).toContainText('Searched Products');
        const count = await productsPage.getProductCount();
        expect(count).toBeGreaterThan(0);
    });

    test('should return no results for gibberish search', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.navigate();
        await productsPage.searchProduct('xyzabcnotaproduct123');
        await expect(productsPage.searchedProductsTitle).toContainText('Searched Products');
        const count = await productsPage.getProductCount();
        expect(count).toBe(0);
    });
});