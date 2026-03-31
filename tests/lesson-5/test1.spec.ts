import { test, expect } from '@playwright/test';

test("Bài tập 1 - Input full data resister page", async ({ page }) => {
// ===== STEP 1: Navigate =====
  await test.step('STEP 1: Navigate', async () => {
    await page.goto("https://material.playwrightvn.com/");
    await page.locator('//a[@href="01-xpath-register-page.html"]').click();
  });
// ===== STEP 2: Fill basic info =====
  await test.step('STEP 2: Fill basic info', async () => {
    await page.locator('//input[@id="username"]').pressSequentially("dinhminh.test", {
      delay: 200,
    });

    await page.locator('//input[@id="email"]').pressSequentially("dinhminh.test@gmail.com", {
      delay: 200,
    });

    await page.locator('//input[@id="female"]').check();
  });
// ===== STEP 3: Handle checkbox =====
  await test.step('STEP 3: Handle checkbox', async () => {
    await page.locator('//input[@id="traveling"]').check();
    await page.locator('//input[@id="cooking"]').check();
    await page.locator('//input[@id="cooking"]').uncheck();

    const isCheckTraveling = await page.locator('//input[@id="traveling"]').isChecked();
    const isCheckCooking = await page.locator('//input[@id="cooking"]').isChecked();
// get status checkbox
    console.log("Status của Traveling: ", isCheckTraveling);
    console.log(`Status của Cooking: ${isCheckCooking}`);
  });
// ===== STEP 4: Select dropdown =====
  await test.step('STEP 4: Select dropdown', async () => {
    await page.locator('//select[@id="country"]').selectOption("Canada");
    await page.locator('//select[@id="interests"]').selectOption(["Sports", "Art", "Music"]);
  });
// ===== STEP 5: Fill additional fields =====
  await test.step('STEP 5: Fill additional fields', async () => {
    await page.locator('//input[@id="dob"]').fill("2026-03-30");
    await page.locator('//input[@id="profile"]').setInputFiles("data-test/anh1.jpg");
    await page.locator('//input[@id="rating"]').fill("5");
    await page.locator('//input[@id="favcolor"]').fill("#ff0095");
  });
// ===== STEP 6: Toggle & newsletter =====
  await test.step('STEP 6: Toggle & newsletter', async () => {
    await page.locator('//input[@id="newsletter"]').check();
    await page.locator('//label[@class="switch"]').click();
  });
// ===== STEP 7: Set star rating (4.5) =====
  await test.step('STEP 7: Set star rating = 4.5', async () => {
    const star = page.locator('#starRating');

    await expect(star).toBeVisible();

    const box = await star.boundingBox();
    if (!box) throw new Error("Star rating not visible");

    await page.mouse.click(
      box.x + box.width * 0.9,
      box.y + box.height / 2
    );

    const value = await page.locator('#starRatingValue').textContent();
    console.log(value);
  });
// ===== STEP 8: Submit =====
  await test.step('STEP 8: Submit', async () => {
    await page.locator('//button[@type="submit"]').click();
  });

});