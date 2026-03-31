import { test, expect } from '@playwright/test';

test("Bài tập 4 - Personal notes", async ({ page }) => {
// ===== STEP 1: Navigate =====
  await test.step('STEP 1: Navigate', async () => {
    await page.goto("https://material.playwrightvn.com/");
    await page.locator('//a[@href="04-xpath-personal-notes.html"]').click();
  });
// ===== STEP 2: Thêm mới 10 note từ VNExpress =====
  await test.step('STEP 2: 10 note từ VNExpress', async () => {
    let title = "Hình dung con đường, cách thiết kế chương trình công nghệ chiến lược";
    let content = "Bộ trưởng Khoa học và Công nghệ Nguyễn Mạnh Hùng nhận định Việt Nam đã hình dung ra khá đầy đủ con đường phát triển công nghệ chiến lược (CNCL)."
    await page.locator('//input[@id="note-title"]').fill(title);
    await page.locator('//textarea[@id="note-content"]').fill(content);
    await page.locator('//button[@id="add-note"]').click();
  });
// ===== STEP 3: Search by title =====
  await test.step('STEP 3: Search by title', async () => {
    let searchValue = "công nghệ"
    await page.locator('//input[@id="search"]').fill(searchValue);
    });
});