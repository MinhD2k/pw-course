import { Locator, Page } from "@playwright/test";

export class MaterialBasepage {
    page: Page;
    xpathRegisterPage: string;
    xpathProductPage: string;
    cssTodoPage: string;
    personalNote: Locator;

    constructor( page: Page) {
        this.page = page;
    }
    async openMaterialPage() {
        await this.page.goto("https://material.playwrightvn.com/");
    }

    async gotoPage( pageName: string) {
        await this.page.locator(`//a[contains(text(),'${pageName}')]`).click(); //truyền tham số pageName để đi đến trang, do locator có chứa pagename
    }
}