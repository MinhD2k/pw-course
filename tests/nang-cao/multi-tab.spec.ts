import { test, expect } from "@playwright/test";

//Xử lý tab mới dc mở sau khi click
test("Handle tab mới đc mở ra sau khi click", async ({ page }) => {
  await test.step("Open main tab", async () => {
    await page.goto("https://material.playwrightvn.com/06-new-tab.html");
  });

  await test.step("Mở trang Google", async () => {
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.locator('a[href="https://www.google.com"]').click()
    ]);

    await newPage.waitForLoadState();

    // Ví dụ verify
    await expect(newPage).toHaveURL(/google/);
  });
});

//Xử lý tab mới dc mở auto ramdom
test("Handle tab mới đc mở auto", async ({ page }) => {
  //mở trang gốc
  await page.goto("https://material.playwrightvn.com/021-page-random-open-new-page.html");

  //tương tác trên trang mới
  await test.step("Thực hiện Đăng ký trên trang mới", async () => {
    const newPage = await page.waitForEvent('popup');
    await newPage.click('#registerBtn');
    
    //verify đã đăng ký trên trang mới thành công
    await expect(newPage.locator('#successMessage')).toBeVisible();
  });
});

//Xử lý các random dialog
test("Accept random dialog", async ({ page }) => {
  await test.step("Mở trang có random dialog", async () => {
    await page.goto("https://material.playwrightvn.com/025-page-with-random-dialog.html");
  });

  await test.step("Accept các random dialog", async () => {
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    await expect(page.locator('#welcome')).toBeVisible({timeout: 20000}); //verify đã accept all dialog và đi đến trang welcome
  })
})