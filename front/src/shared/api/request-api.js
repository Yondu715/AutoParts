import { sendRequest } from "./request";

const protocolHttp = "http";
const protocolWs = "ws";
const host = "localhost";
const port = "8080";
const name = "autoparts-1";
const path = `${host}:${port}/${name}`;
const domainHttp = `${protocolHttp}://${path}`;
const domainWs = `${protocolWs}://${path}`;

export const requestAPI = {

    async sendRequest(request, callback) {
        const response = await request();
        if (!callback) {
            return;
        }
        const data = response.getBody();
        const status = response.getStatus();
        if (data) {
            callback(status, data);
        } else {
            callback(status);
        }
    },

    async asyncGetAllProducts() {
        return await sendRequest("GET", `${domainHttp}/api/products`);
    },

    async asyncGetUserProducts() {
        return await sendRequest("GET", `${domainHttp}/api/products/userProducts`);
    },

    async asyncGetProductInfo(product_id) {
        return await sendRequest("GET", `${domainHttp}/api/products/${product_id}`);
    },

    async asyncAuth(user) {
        return await sendRequest("POST", `${domainHttp}/api/users/auth`, user);
    },

    async asyncReg(user) {
        return await sendRequest("POST", `${domainHttp}/api/users/registration`, user);
    },


    async asyncSaleProduct(product) {
        return await sendRequest("POST", `${domainHttp}/api/products/sale`, product);
    },

    async asyncDeleteProducts(products_id) {
        return await sendRequest("DELETE", `${domainHttp}/api/products/userProducts`, products_id);
    },

    async asyncAddToCart(product) {
        return await sendRequest("POST", `${domainHttp}/api/users/cart`, product);
    },

    async asyncGetCart() {
        return await sendRequest("GET", `${domainHttp}/api/users/cart`);
    },

    async asyncDeleteFromCart(products_id) {
        return await sendRequest("DELETE", `${domainHttp}/api/users/cart`, products_id);
    },

    async asyncGetAllApplications() {
        return await sendRequest("GET", `${domainHttp}/api/admin/applications`);
    },

    async asyncDeleteApplications(applications_id) {
        return await sendRequest("DELETE", `${domainHttp}/api/admin/applications`, applications_id);
    },

    async asyncAcceptApplications(applications) {
        return await sendRequest("PUT", `${domainHttp}/api/admin/applications`, applications);
    },

    async asyncGetAllUsers() {
        return await sendRequest("GET", `${domainHttp}/api/admin/users`);
    },

    async asyncDeleteUsers(users_id) {
        return await sendRequest("DELETE", `${domainHttp}/api/admin/users`, users_id);
    },

    connectToChat(id) {
        return new WebSocket(`${domainWs}/chat/${id}`);
    }
}