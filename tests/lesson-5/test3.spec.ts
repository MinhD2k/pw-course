import { test, expect } from '@playwright/test';

test("Bài tập 3 - To do page", async ({ page }) => {
// ===== STEP 1: Navigate =====
  await test.step('STEP 1: Navigate', async () => {
    await page.goto("https://material.playwrightvn.com/");
    await page.locator('//a[@href="03-xpath-todo-list.html"]').click();
  });
// ===== STEP 2: Thêm mới 100 To do items =====
  await test.step('STEP 2: Thêm mới 100 To do items', async () => {
    for (let i = 1; i <= 100; i++) //thêm 100 to do items
        {
        await page.locator('//input[@id="new-task"]').fill("To do " + i);
        await page.locator('//button[@id="add-task"]').click();
        }
  });
// ===== STEP 3: Xóa các to do có số lẻ =====
  await test.step('STEP 3: Xóa các to do có số lẻ', async () => {
    page.on('dialog', async dialog => {
        await dialog.accept();
        });
    for (let a = 1; a <= 100; a += 2) 
        {
        const btn = `//button[@id="to-do-${a}-delete"]`;
        console.log(btn);
        await page.locator(btn).click();
        }
    });
});