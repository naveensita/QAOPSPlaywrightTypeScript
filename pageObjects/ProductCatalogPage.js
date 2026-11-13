
class ProductCatalogPage {

    constructor(page) {
        this.page = page;
        this.productTexts = this.page.locator(".card-body b");
        this.products = this.page.locator(".card-body");
        this.addToCartBtn = "text=' Add To Cart'";
        this.cartBtn = this.page.locator("[routerlink*='/dashboard/cart']");
        this.productList = this.page.locator("div li");
    }

    async addTocart(productName) {
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

    async naviagteTOCartPage(productName) {
        await this.cartBtn.click();
        await this.productList.first().waitFor();
    }
}
module.exports = { ProductCatalogPage };