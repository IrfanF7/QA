import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('.shopping_cart_link').click();
})

test('Checkout', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.locator('#checkout').click();
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
})

test('Checkout with full field', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.locator('#checkout').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await page.locator('#first-name').fill('standard_user');
    await page.waitForTimeout(1000);
    await page.locator('#last-name').fill('standard_user');
    await page.waitForTimeout(1000);
    await page.locator('#postal-code').fill('12345');
    await page.waitForTimeout(1000);
    await page.locator('#continue').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
})

test('Checkout with empty field', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.locator('#checkout').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await page.waitForTimeout(1000);
    await page.locator('#continue').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.error-message-container')).toBeVisible();
})

test('Checkout with only first name', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.locator('#checkout').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await page.locator('#first-name').fill('standard_user');
    await page.waitForTimeout(1000);
    await page.locator('#continue').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.error-message-container')).toBeVisible();
})

test('Checkout with only last name', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.locator('#checkout').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await page.locator('#last-name').fill('standard_user');
    await page.waitForTimeout(1000);
    await page.locator('#continue').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.error-message-container')).toBeVisible();
})

test('Checkout with only postal code', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.locator('#checkout').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await page.locator('#postal-code').fill('12345');
    await page.waitForTimeout(1000);
    await page.locator('#continue').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.error-message-container')).toBeVisible();
})

test('Verify button cancel in checkout:your information', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.waitForTimeout(1000);
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.inventory_item_name')).toHaveCount(1);
    await page.locator('#checkout').click();
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await page.waitForTimeout(1000);
    await page.locator('#cancel').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Your Cart');
})

test('Verify button cancel in checkout:overview', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.waitForTimeout(1000);
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.inventory_item_name')).toHaveCount(1);
    await page.locator('#checkout').click();
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await page.waitForTimeout(1000);
    await page.locator('#first-name').fill('standard_user');
    await page.waitForTimeout(1000);
    await page.locator('#last-name').fill('standard_user');
    await page.waitForTimeout(1000);
    await page.locator('#postal-code').fill('12345');
    await page.waitForTimeout(1000);
    await page.locator('#continue').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    await page.locator('#cancel').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Products');
})

test('Verify checkout finish', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.waitForTimeout(1000);
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.inventory_item_name')).toHaveCount(1);
    await page.locator('#checkout').click();
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await page.waitForTimeout(1000);
    await page.locator('#first-name').fill('standard_user');
    await page.waitForTimeout(1000);
    await page.locator('#last-name').fill('standard_user');
    await page.waitForTimeout(1000);
    await page.locator('#postal-code').fill('12345');
    await page.waitForTimeout(1000);
    await page.locator('#continue').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    await page.locator('#finish').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
})