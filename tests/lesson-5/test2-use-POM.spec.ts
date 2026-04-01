import { expect, test } from "@playwright/test";
import { ProductPage } from "../../page/product-page";

test (" Bài 2 - Product page - sử dụng POM", async({ page }) => {
    let productPage = new ProductPage(page);
    const arrayProducts = [ //số sản phẩm cần thêm vào giỏ hàng
        {
            name: "Product 1",
            price: 10,
            quantity: 2
        },
        {
            name: "Product 2",
            price: 20,
            quantity: 3
        },
        {
            name: "Product 3",
            price: 30,
            quantity: 1
        }
    ]

    await test.step("Truy cập trang Product page", async() => {
        await productPage.goToProductPage();
    })

    await test.step("Thêm các sản phẩm vào giỏ hàng", async() => {
        for (let i = 0; i < arrayProducts.length; i++) {
            await productPage.addProductToCart(arrayProducts[i].name, arrayProducts[i].quantity);
        }
    })

    await test.step("Kiểm tra số lượng sp trong giỏ hàng đúng", async() => {
        for (let i = 0; i < arrayProducts.length; i++) {
            const actualQuantityProduct = (await productPage.getInfoProductInCart(arrayProducts[i].name)).quantity;
            const expectQuantityProduct = arrayProducts[i].quantity;
            expect(actualQuantityProduct).toEqual(expectQuantityProduct.toString());
        }
        
    })

    await test.step("Kiểm tra tổng tiền total đúng", async() => {
        for (let i = 0; i < arrayProducts.length; i++) {
            const actualTotal = (await productPage.getInfoProductInCart(arrayProducts[i].name)).total;
            const total = arrayProducts[i].quantity*arrayProducts[i].price;
            const expectTotal = "$" + total.toFixed(2); //cần chuyển đổi như này để map với UI = $20.00 thì mới đem so sánh toEqual được
            expect(actualTotal).toEqual(expectTotal);
            console.log(actualTotal);
            console.log(expectTotal);
        }
    })
})