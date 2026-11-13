import { APIRequestContext } from '@playwright/test';
export class APIUtils{

    apiContext : any;
    loginPayload : any;

    constructor(apiContext : any, loginPayload : any){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data : this.loginPayload
            })
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(createOrderPayload : any){
        let response = {token : '', orderId : ''};
        response.token = await this.getToken();
        //Create Order
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data : createOrderPayload,
                headers : {
                    "authorization" : response.token,
                    "content-type" : "application/json"
                }
            });
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        console.log(orderId);
        response.orderId = orderId;
        return response;
    }
}