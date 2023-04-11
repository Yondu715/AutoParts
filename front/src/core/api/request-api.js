import { LS_TOKEN } from "../../utils/consts";
import { Response } from "../model/transport/Response";


const protocolHttp = "http";
const protocolWs = "ws";
const host = "localhost";
const port = "8080";
const name = "autoparts-1";
const path = `${host}:${port}/${name}`;
const domainHttp = `${protocolHttp}://${path}`;
const domainWs = `${protocolWs}://${path}`;

const _sendRequest = async (method, uri, data, options) => {
	const headers = new Headers({
		"Content-Type": "application/json; charset=utf-8",
		"Authorization": localStorage.getItem(LS_TOKEN),
		...options
	});

	method = method.toLowerCase();
	if (method === "delete") {
		headers.append("Data", JSON.stringify(data));
	}

	const body = contentIs(headers, "application/json") && data && method !== "delete"
		? JSON.stringify(data)
		: undefined;

	const response = await fetch(uri, { method: method, headers: headers, body: body });

	const answer = contentIs(response.headers, "application/json")
		? await response.json()
		: await response.text();

	return new Response(response.status, answer);
}

const contentIs = (headers, type) => {
	return headers.get("Content-Type")?.includes(type) ?? false;
}

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
		return await _sendRequest("GET", `${domainHttp}/api/products`);
	},

	async asyncGetUserProducts() {
		return await _sendRequest("GET", `${domainHttp}/api/products/userProducts`);
	},

	async asyncGetProductInfo(product_id) {
		return await _sendRequest("GET", `${domainHttp}/api/products/${product_id}`);
	},

	async asyncAuth(user) {
		return await _sendRequest("POST", `${domainHttp}/api/users/auth`, user);
	},

	async asyncReg(user) {
		return await _sendRequest("POST", `${domainHttp}/api/users/registration`, user);
	},


	async asyncSaleProduct(product) {
		return await _sendRequest("POST", `${domainHttp}/api/products/sale`, product);
	},

	async asyncDeleteProducts(products_id) {
		return await _sendRequest("DELETE", `${domainHttp}/api/products/userProducts`, products_id);
	},

	async asyncAddToCart(product) {
		return await _sendRequest("POST", `${domainHttp}/api/users/cart`, product);
	},

	async asyncGetCart() {
		return await _sendRequest("GET", `${domainHttp}/api/users/cart`);
	},

	async asyncDeleteFromCart(products_id) {
		return await _sendRequest("DELETE", `${domainHttp}/api/users/cart`, products_id);
	},

	async asyncGetAllApplications() {
		return await _sendRequest("GET", `${domainHttp}/api/admin/applications`);
	},

	async asyncDeleteApplications(applications_id) {
		return await _sendRequest("DELETE", `${domainHttp}/api/admin/applications`, applications_id);
	},

	async asyncAcceptApplications(applications) {
		return await _sendRequest("PUT", `${domainHttp}/api/admin/applications`, applications);
	},

	async asyncGetAllUsers() {
		return await _sendRequest("GET", `${domainHttp}/api/admin/users`);
	},

	async asyncDeleteUsers(users_id) {
		return await _sendRequest("DELETE", `${domainHttp}/api/admin/users`, users_id);
	},

	connectToChat(id) {
		return new WebSocket(`${domainWs}/chat/${id}`);
	}
}