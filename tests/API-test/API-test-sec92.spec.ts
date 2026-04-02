import { test, Page } from '@playwright/test';
const username = "dinhminh";
const email = "minh.dinh@sotatek.com";
const password = "123456Aa@";
const title = "API in Playwright";
const about = "How to use Playwright to creat article";
const body = "This is the body content";
const tags = "Playwright Viet Name, pw, pw-k6";

async function login( page: Page) {
        await page.goto("https://conduit.bondaracademy.com/");
        await page.locator('a[href="/login"]').click();
        await page.locator('input[formcontrolname="email"]').fill(email);
        await page.locator('input[formcontrolname="password"]').fill(password);
        await page.locator('button[type="submit"]').click();
        }

test("Test 1: Đăng ký tài khoản", async ({ page }) => {
    // ===== STEP 1: Navigate =====
    await test.step("Navigate to Register page", async() => {
        await page.goto("https://conduit.bondaracademy.com/");
        await page.locator('//a[@href="/register"]').click();
    })
    // ===== STEP 2: Fill info to signup =====
    await test.step("Fill info to signup", async() => {
        await page.locator('//input[@formcontrolname="username"]').pressSequentially(username, {
        delay: 100,
        });
        await page.locator('//input[@formcontrolname="email"]').pressSequentially(email, {
        delay: 100,
        });
        await page.locator('//input[@formcontrolname="password"]').pressSequentially(password, {
        delay: 100,
        });
        //click btn Sign up
        await page.locator('//button[@type="submit"]').click();
        console.log(username, email);
    })
})

test("Test 2: Đăng nhập tài khoản & Tạo 1 article mới", async ({ page }) => {
    //login
    await login(page);

    // ===== Test 2b: Tạo article mới =====
    await test.step("Fill info to create new article", async() => {
        await page.locator('//a[@href="/editor"]').click();
        await page.locator('//input[@formcontrolname="title"]').pressSequentially(title, {
        delay: 100,
        });
        await page.locator('//input[@formcontrolname="description"]').pressSequentially(about, {
            delay: 100,
            });
        await page.locator('//textarea[@formcontrolname="body"]').pressSequentially(body, {
            delay: 100,
            });
        await page.locator('//input[@placeholder="Enter tags"]').pressSequentially(tags, {
            delay: 100,
            });
        //Click btn Publish Article
        await page.locator('//button[@class="btn btn-lg pull-xs-right btn-primary"]').click();
    })
})

test("Test 3: Thêm mới 5 comment", async ({ page }) => {
    //login
    await login(page);
    //navigate to Article
    await test.step("Navigate to Article", async() => {
        await page.locator('//a[@href="/article/API-in-Playwright-51162"]').click();
    })

    await test.step("Fill data to post comment", async () => {
        for (let i = 1; i <= 5; i++) {
            await page.locator('//textarea[@placeholder="Write a comment..."]').fill(`Comment 0${i}`);
            await page.locator('//button[@type="submit"]').click();
        }
    })
})

test("Test 4: Xóa cmt 2 và 5", async ({ page }) => {
    //login
    await login(page);
    //navigate to Article
    await test.step("Navigate to Article", async() => {
        await page.locator('//a[@href="/article/API-in-Playwright-51162"]').click();
    })

    await test.step("Test 4: xóa cmt 02 và 05", async () => {
        const commentItem2 = page.locator('app-article-comment').filter({
            hasText: 'Comment 02' //dùng hasText để tìm chính xác locator
            });

        await commentItem2.locator('.ion-trash-a').click();
        })
        const commentItem5 = page.locator('app-article-comment').filter({
            hasText: 'Comment 05'
            });

        await commentItem5.locator('.ion-trash-a').click();
})
    