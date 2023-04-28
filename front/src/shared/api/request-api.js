import { sendRequest } from "./request";

const protocolHttp = "http";
const protocolWs = "ws";
const host = "localhost";
const port = "8080";
const name = "autoparts-1";
const version = "v1";
const path = `${host}:${port}/${name}`;
const domainHttp = `${protocolHttp}://${path}/api/${version}`;
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
        return await sendRequest("GET", `${domainHttp}/products`);
    },

    async asyncGetUserProducts(userId) {
        return await sendRequest("GET", `${domainHttp}/users/${userId}/products`);
    },

    async asyncGetProductInfo(product_id) {
        return await sendRequest("GET", `${domainHttp}/products/${product_id}`);
    },

    async asyncAuth(user) {
        return await sendRequest("POST", `${domainHttp}/users/auth`, user);
    },

    async asyncReg(user) {
        return await sendRequest("POST", `${domainHttp}/users/registration`, user);
    },


    async asyncSaleProduct(product) {
        return await sendRequest("POST", `${domainHttp}/products/`, product);
    },

    async asyncDeleteProducts(userId, products_id) {
        return await sendRequest("DELETE", `${domainHttp}/users/${userId}/products`, products_id);
    },

    async asyncAddToCart(userId, product) {
        return await sendRequest("POST", `${domainHttp}/users/${userId}/cart`, product);
    },

    async asyncGetCart(userId) {
        return await sendRequest("GET", `${domainHttp}/users/${userId}/cart`);
    },

    async asyncDeleteFromCart(userId, productsId) {
        return await sendRequest("DELETE", `${domainHttp}/users/${userId}/cart`, productsId);
    },

    async asyncGetAllApplications() {
        return await sendRequest("GET", `${domainHttp}/admin/applications`);
    },

    async asyncDeleteApplications(applications_id) {
        return await sendRequest("DELETE", `${domainHttp}/admin/applications`, applications_id);
    },

    async asyncAcceptApplications(applications) {
        return await sendRequest("PUT", `${domainHttp}/admin/applications`, applications);
    },

    async asyncGetAllUsers() {
        return await sendRequest("GET", `${domainHttp}/admin/users`);
    },

    async asyncDeleteUsers(users_id) {
        return await sendRequest("DELETE", `${domainHttp}/admin/users`, users_id);
    },

    connectToChat(id) {
        return new WebSocket(`${domainWs}/chat/${id}`);
    }
}