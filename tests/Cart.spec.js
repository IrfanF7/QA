import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
})

test('Add to cart and verify', async ({ page }) => {
    const productName = await page.locator('.inventory_item_name').first().textContent();
    await page.locator('.btn_primary').first().click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Your Cart');
    await expect(page.locator('.inventory_item_name')).toHaveText(productName);
})

test('Add multiple product to cart', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.waitForTimeout(1000);
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await page.waitForTimeout(1000);
    await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.inventory_item_name')).toHaveCount(3);
})

test('Remove product from cart', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.waitForTimeout(1000);
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await page.waitForTimeout(1000);
    await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.inventory_item_name')).toHaveCount(3);
    await page.waitForTimeout(1000);
    await page.locator('#remove-sauce-labs-backpack').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await page.locator('#remove-sauce-labs-bike-light').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('#remove-sauce-labs-bolt-t-shirt').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
})

test('Continue shopping', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.waitForTimeout(1000);
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await page.waitForTimeout(1000);
    await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.inventory_item_name')).toHaveCount(3);
    await page.waitForTimeout(1000);
    await page.locator('#continue-shopping').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.title')).toHaveText('Products');
})

test('Verify checkout button', async ({ page }) => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.waitForTimeout(1000);
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.inventory_item_name')).toHaveCount(1);
    await page.locator('#checkout').click();
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
})