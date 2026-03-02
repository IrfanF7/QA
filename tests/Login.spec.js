import { test, expect } from '@playwright/test';

test('Swag Test web access', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  //validasi title
  await expect(page).toHaveURL('https://www.saucedemo.com/');

})

test('Login Test Berhasil', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  //ini menggunakan standar_user, bisa juga menggunakan  problem_user, performance_glitch_user,dll
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.waitForTimeout(3000);
  await page.locator('#login-button').click();

  //validasi login berhasil
  await expect(page.locator('.title')).toHaveText('Products');
})

test('Login dengan username benar dan password salah', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('wrong_password');
  await page.waitForTimeout(3000);
  await page.locator('#login-button').click();

  //validasi login gagal
  await expect(page.locator('.error-message-container')).toBeVisible();
})

test('Login dengan username salah dan password benar', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('wrong_username');
  await page.locator('#password').fill('secret_sauce');
  await page.waitForTimeout(3000);
  await page.locator('#login-button').click();

  //validasi login gagal
  await expect(page.locator('.error-message-container')).toBeVisible();
})

test('Login dengan username salah dan pasword salah', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('wrong_username');
  await page.locator('#password').fill('wrong_password');
  await page.waitForTimeout(3000);
  await page.locator('#login-button').click();

  //validasi login gagal
  await expect(page.locator('.error-message-container')).toBeVisible();
})

test('Login dengan field username kosong dan password kosong', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('');
  await page.locator('#password').fill('');
  await page.waitForTimeout(3000);
  await page.locator('#login-button').click();

  //validasi login gagal
  await expect(page.locator('.error-message-container')).toBeVisible();
})

test('Login dengan user terkunci', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  //ini menggunakan locked_out_user, bisa juga menggunakan  problem_user, performance_glitch_user,dll
  await page.locator('#user-name').fill('locked_out_user');
  await page.locator('#password').fill('secret_sauce');
  await page.waitForTimeout(3000);
  await page.locator('#login-button').click();

  //validasi login gagal
  await expect(page.locator('.error-message-container')).toBeVisible();
})