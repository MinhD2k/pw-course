import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../page/register-page';

let date = "2026-03-31";
let username = "MinhDinh.test";
let email = "minhdinh.test@gmail.com";
let description = "Giới thiệu của Minh";

test("Bài tập 1 - Register page đã áp dụng POM", async ({ page }) => {
    let registerPage = new RegisterPage(page);

    await test.step("Mở trang Register Page", async () => {
        await registerPage.goToRegisterPage();
    })
    await test.step("Nhập đầy đủ các thông tin", async() => {
        await registerPage.fillUserName(username);
        await registerPage.fillEmail(email);
        await registerPage.checkGender("Female");
        await registerPage.checkHobby("traveling");
        await registerPage.selectInterest("art");
        await registerPage.selectCountry("canada");
        await registerPage.chooseFile("data-test/anh1.jpg");
        await registerPage.fillDateOfBirth(date);
        await registerPage.fillBiography(description);
        await registerPage.checkNewsLetter();

        await registerPage.clickBtnRegister();
    })

    await test.step("Kiểm tra thông tin sau khi đã đăng ký là đúng", async () => {
        const userInfo = await registerPage.getInfoNewestInTable();
        const actualUsername = userInfo.username;
        const actualEmail = userInfo.email;
        const actualInformation = userInfo.information;

        //verify user name
        expect(actualUsername).toBe(username);

        //verify email
        expect(actualEmail).toBe(email);

        //verify information
        expect(actualInformation).toContain("female");
        expect(actualInformation).toContain("traveling");
        expect(actualInformation).toContain("canada");
        expect(actualInformation).toContain(date);
        expect(actualInformation).toContain(description);
    })
})