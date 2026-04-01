import { Page } from "@playwright/test";
import { MaterialBasepage } from "./material-page";

export class RegisterPage extends MaterialBasepage {
    xpathUserName = '//input[@id="username"]';
    xpathEmail = '//input[@id="email"]';
    xpathGenderMale = '//input[@id="male"]';
    xpathGenderFemale = '//input[@id="female"]';
    getxpathOptionHobby(hobby: "reading" | "traveling" | "cooking") {
        return `//input[@id="${hobby}"]`
    }
    xpathSelectInterest = '//select[@id="interests"]';
    xpathSelectCountry = '//select[@id="country"]';
    xpathDateOfBirth = '//input[@id="dob"]';
    xpathProfilePicture = '//input[@id="profile"]';
    xpathBiography = '//textarea[@id="bio"]';
    xpathNewsLetter = '//input[@id="newsletter"]';
    xpathBtnRegister = '//button[@type="submit"]';

    constructor( page: Page) {
        super(page);
    }

    async goToRegisterPage() {
        await this.openMaterialPage(); //kế thừa mở trang chính
        await this.gotoPage("Register Page"); //mở trang Register
    }
    
    async fillUserName(username: string) {
        await this.page.locator(this.xpathUserName).fill(username);
    }

    async fillEmail(email: string) {
        await this.page.locator(this.xpathEmail).fill(email);
    }

    async checkGender(gender: "Male" | "Female") {
        if (gender == "Male") {
            await this.page.locator(this.xpathGenderMale).check();
        }
        if (gender == "Female") {
            await this.page.locator(this.xpathGenderFemale).check();
        }
    }

    async checkHobby(hobby: "reading" | "traveling" | "cooking") {
        await this.page.locator(this.getxpathOptionHobby(hobby)).check();
    }

    async selectInterest(interestValue: "technology" | "science" | "art" | "music") {
        await this.page.locator(this.xpathSelectInterest, interestValue);
    }

    async selectCountry(countryValue: "usa" | "canada" | "uk" | "australia") {
        await this.page.locator(this.xpathSelectCountry, countryValue);
    }

    async fillDateOfBirth(date: string) {
        await this.page.locator(this.xpathDateOfBirth).fill(date);
    }
    async chooseFile(filePath: string) {
        await this.page.locator(this.xpathProfilePicture).setInputFiles(filePath);
    }
    
    async fillBiography(bio: string) {
        await this.page.locator(this.xpathBiography).fill(bio);
    }

    async checkNewsLetter() {
        await this.page.locator(this.xpathNewsLetter).check();
    }

    async clickBtnRegister() {
        await this.page.locator(this.xpathBtnRegister).click();
    }

    async fillFormRegister(information: { //khai báo object information
        username: string, //khai báo cáo thuộc tính của object
        email: string,
        gender: "Male" | "Female",
        hobby: "reading" | "traveling" | "cooking",
        interestValue: "technology" | "science" | "art" | "music",
        countryValue: "usa" | "canada" | "uk" | "australia",
        date: string,
        filePath: string,
        bio: string
    }) {
        await this.fillUserName(information.username); //khai báo method của object
        await this.fillEmail(information.email);
        await this.checkGender(information.gender);
        await this.checkHobby(information.hobby);
        await this.selectInterest(information.interestValue);
        await this.selectCountry(information.countryValue);
        await this.fillDateOfBirth(information.date);
        await this.chooseFile(information.filePath);
        await this.fillBiography(information.bio);
        await this.clickBtnRegister();
    }

    async getInfoNewestInTable() { 
        const numberOfRows = await this.page.locator("//tbody/tr").count(); //khai báo biến này để đếm số dòng của bảng
        let userInfo = { //tạo object chưa các thuộc tính cần verify
            username: await this.page.locator(`//tbody/tr[${numberOfRows}]/td[2]`).textContent(),
            email: await this.page.locator(`//tbody/tr[${numberOfRows}]/td[3]`).textContent(),
            information: await this.page.locator(`//tbody/tr[${numberOfRows}]/td[4]`).textContent(),
        }
        return userInfo;
    }
}