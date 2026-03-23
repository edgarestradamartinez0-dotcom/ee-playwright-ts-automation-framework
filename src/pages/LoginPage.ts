import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly loginFormTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('form[action="/login"] input[data-qa="login-email"]');
        this.passwordInput = page.locator('form[action="/login"] input[data-qa="login-password"]');
        this.loginButton = page.locator('form[action="/login"] button[data-qa="login-button"]');
        this.errorMessage = page.locator('form[action="/login"] p');
        this.loginFormTitle = page.locator('div.login-form h2');
    }

    async navigate(): Promise<void> {
        await this.page.goto('/login');
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return this.errorMessage.innerText();
    }
}