import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
    country: string;
}
export const customtest = baseTest.extend<{testDataForOrder : TestDataForOrder}>({
    testDataForOrder : {
    username : "naveenpathak715@gmail.com",
    password : "Sonu123@#",
    productName : "ZARA COAT 3",
    country : "India"
}
})