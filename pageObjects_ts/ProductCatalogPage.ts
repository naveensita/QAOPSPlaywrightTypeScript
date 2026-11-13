import { Locator, Page } from "@playwright/test";

export class ProductCatalogPage {

    page : Page;
    productTexts : Locator;
    products : Locator;
    addToCartBtn : string;
    cartBtn : Locator;
    productList : Locator;


    constructor(page : Page) {
        this.page = page;
        this.productTexts = this.page.locator(".card-body b");
        this.products = this.page.locator(".card-body");
        this.addToCartBtn = "text=' Add To Cart'";
        this.cartBtn = this.page.locator("[routerlink*='/dashboard/cart']");
        this.productList = this.page.locator("div li");
    }

    async addTocart(productName : string) {
        const titlesTexts = await this.productTexts.allTextContents();
        console.log(titlesTexts);

        for (let i = 0; i < await this.products.count(); i++) {
            const name = await this.products.nth(i).locator("b").textContent();
            if (name === productName) {
                //Add to cart
                await this.products.nth(i).locator(this.addToCartBtn).click();
                break;
            }
        }
    }

    async naviagteTOCartPage(productName : string) {
        await this.cartBtn.click();
        await this.productList.first().waitFor();
    }
}