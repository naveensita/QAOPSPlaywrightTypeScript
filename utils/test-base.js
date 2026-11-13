const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder : {
    username : "naveenpathak715@gmail.com",
    password : "Sonu123@#",
    productName : "ZARA COAT 3",
    country : "India"
}
})