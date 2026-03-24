import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoginData, ExpectedText } from '../fixtures/testData';

test.describe('Login Page', () => {

    test('should display login form', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await expect(loginPage.loginFormTitle).toBeVisible();
        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('should show error with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(LoginData.invalidUser.email, LoginData.invalidUser.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain(ExpectedText.loginError);
    });

    test('should show error with empty fields', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.loginButton.click();
        // Browser HTML5 validation blocks submission - email field should be focused and invalid
        // I encountered browser-native validation behavior that differed from server-side error handling, 
        // and updated the test to assert the correct validation state.
        const isEmailInvalid = await loginPage.emailInput.evaluate(
            (el: HTMLInputElement) => !el.validity.valid
        );
        expect(isEmailInvalid).toBe(true);
    });
});
