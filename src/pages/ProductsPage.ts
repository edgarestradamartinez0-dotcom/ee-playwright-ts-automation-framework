import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productsList: Locator;
    readonly searchedProductsTitle: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.productsList = page.locator('.productinfo');
        this.searchedProductsTitle = page.locator('h2.title.text-center');
        this.pageTitle = page.locator('h2.title.text-center').first();
    }

    async navigate(): Promise<void> {
        await this.page.goto('/products');
    }

    async searchProduct(term: string): Promise<void> {
        await this.searchInput.fill(term);
        await this.searchButton.click();
    }

    async getProductCount(): Promise<number> {
        return this.productsList.count();
    }
}
