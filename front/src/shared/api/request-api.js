import { requestInstance } from "./request";

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

    setRequestInterceptor(callback){
        requestInstance.interceptors.request.use(callback);
    },

    setResponseInterceptor(callback) {
        requestInstance.interceptors.response.use(callback);
    },

    async asyncGetAllProducts() {
        return await requestInstance.sendRequest("GET", `${domainHttp}/products`);
    },

    async asyncGetUserProducts(userId) {
        return await requestInstance.sendRequest("GET", `${domainHttp}/users/${userId}/products`);
    },

    async asyncGetProductInfo(product_id) {
        return await requestInstance.sendRequest("GET", `${domainHttp}/products/${product_id}`);
    },

    async asyncAuth(user) {
        return await requestInstance.sendRequest("POST", `${domainHttp}/users/auth`, user);
    },

    async asyncReg(user) {
        return await requestInstance.sendRequest("POST", `${domainHttp}/users/registration`, user);
    },


    async asyncSaleProduct(product) {
        return await requestInstance.sendRequest("POST", `${domainHttp}/products/`, product);
    },

    async asyncDeleteProducts(userId, products_id) {
        return await requestInstance.sendRequest("DELETE", `${domainHttp}/users/${userId}/products`, products_id);
    },

    async asyncAddToCart(userId, product) {
        return await requestInstance.sendRequest("POST", `${domainHttp}/users/${userId}/cart`, product);
    },

    async asyncGetCart(userId) {
        return await requestInstance.sendRequest("GET", `${domainHttp}/users/${userId}/cart`);
    },

    async asyncDeleteFromCart(userId, productsId) {
        return await requestInstance.sendRequest("DELETE", `${domainHttp}/users/${userId}/cart`, productsId);
    },

    async asyncGetAllApplications() {
        return await requestInstance.sendRequest("GET", `${domainHttp}/admin/applications`);
    },

    async asyncDeleteApplications(applications_id) {
        return await requestInstance.sendRequest("DELETE", `${domainHttp}/admin/applications`, applications_id);
    },

    async asyncAcceptApplications(applications) {
        return await requestInstance.sendRequest("PUT", `${domainHttp}/admin/applications`, applications);
    },

    async asyncGetAllUsers() {
        return await requestInstance.sendRequest("GET", `${domainHttp}/admin/users`);
    },

    async asyncDeleteUsers(users_id) {
        return await requestInstance.sendRequest("DELETE", `${domainHttp}/admin/users`, users_id);
    },

    connectToChat(id) {
        return new WebSocket(`${domainWs}/chat/${id}`);
    }
}