import { test, expect } from '@playwright/test';

test("Bài tập 2 - Thêm sản phẩm", async ({ page }) => {
// ===== STEP 1: Navigate =====
  await test.step('STEP 1: Navigate', async () => {
    await page.goto("https://material.playwrightvn.com/");
    await page.locator('//a[@href="02-xpath-product-page.html"]').click();
  });
// ===== STEP 2: Thêm sản phẩm =====
  await test.step('STEP 2: Thêm sản phẩm ', async () => {
    await page.locator('//button[@data-product-id="1"]').click();
    await page.locator('//button[@data-product-id="1"]').click();
    for (let i = 0; i < 3; i++) //thêm 3 sản phẩm số 2
        {
        await page.locator('//button[@data-product-id="2"]').click();
        }
    await page.locator('//button[@data-product-id="3"]').click();
    
    });

});