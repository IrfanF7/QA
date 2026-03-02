import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('.title')).toHaveText('Products');
})

//Verifikasi berhasil ke halaman homepage
test('Verify title homepage', async ({ page }) => {
    await expect(page.locator('.title')).toHaveText('Products');
})

//Verifikasi jumlah product
test('Verify list product', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
})

test('Filter product A-Z', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('az');
    const productNames = await page.locator('.inventory_item_name').allTextContents();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
})

test('Filter product Z-A', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('za');
    const productNames = await page.locator('.inventory_item_name').allTextContents();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
})

test('Filter product low to high', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('lohi');
    const priceText = await page.locator('.inventory_item_price').allTextContents();
    const price = priceText.map(price => parseFloat(price.replace('$', '')))
    const sortedPrice = [...price].sort((a, b) => a - b);
    expect(price).toEqual(sortedPrice);
})

test('Filter product high to low', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('hilo');
    const priceText = await page.locator('.inventory_item_price').allTextContents();
    const price = priceText.map(price => parseFloat(price.replace('$', '')))
    const sortedPrice = [...price].sort((a, b) => b - a);
    expect(price).toEqual(sortedPrice);
})

test('Add to cart', async ({ page }) => {
    await page.locator('.btn_primary').first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
})

test('Remove from cart', async ({ page }) => {
    await page.locator('.btn_primary').first().click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('.btn_secondary').first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
})