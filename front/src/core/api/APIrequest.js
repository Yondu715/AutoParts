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

const _sendRequest = async (type, uri, data, options) => {
	const headers = Object.assign({
		"Content-type": "application/json; charset=utf-8",
		"Authorization": localStorage.getItem(LS_TOKEN),
	}, options);

	type = type.toLowerCase();
	let response;
	if (data === null || data === undefined) {
		response = await fetch(uri, { method: type, headers: headers });
	} else if (type === "delete" || type === "get") {
		headers["Data"] = JSON.stringify(data);
		response = await fetch(uri, { method: type, headers: headers });
	} else {
		response = await fetch(uri, { method: type, headers: headers, body: JSON.stringify(data) });
	}

	let json = null;
	try {
		json = await response.json();
	} catch (error) {
	}
	return new Response(response.status, json);
}

export const asyncGetAllProducts = async () => {
	return await _sendRequest("GET", `${domainHttp}/api/products`);
}

export const asyncGetUserProducts = async () => {
	return await _sendRequest("GET", `${domainHttp}/api/products/userProducts`);
}

export const asyncGetProductInfo = async (product_id) => {
	return await _sendRequest("GET", `${domainHttp}/api/products/${product_id}`);
}

export const asyncAuth = async (user) => {
	let data;
	try {
		data = user.get();
	} catch (error) {
		data = null;
	}
	return await _sendRequest("POST", `${domainHttp}/api/users/auth`, data);
}

export const asyncReg = async (user) => {
	return await _sendRequest("POST", `${domainHttp}/api/users/registration`, user.get());
}


export const asyncSaleProduct = async (product) => {
	return await _sendRequest("POST", `${domainHttp}/api/products/sale`, product.get());
}

export const asyncDeleteProducts = async (products_id) => {
	return await _sendRequest("DELETE", `${domainHttp}/api/products/userProducts`, products_id);
}

export const asyncAddToCart = async (product) => {
	return await _sendRequest("POST", `${domainHttp}/api/users/cart`, product.get());
}

export const asyncGetCart = async () => {
	return await _sendRequest("GET", `${domainHttp}/api/users/cart`);
}

export const asyncDeleteFromCart = async (products_id) => {
	return await _sendRequest("DELETE", `${domainHttp}/api/users/cart`, products_id);
}

export const asyncGetAllApplications = async () => {
	return await _sendRequest("GET", `${domainHttp}/api/admin/applications`);
}

export const asyncDeleteApplications = async (applications_id) => {
	return await _sendRequest("DELETE", `${domainHttp}/api/admin/applications`, applications_id);
}

export const asyncAcceptApplications = async (applications) => {
	return await _sendRequest("PUT", `${domainHttp}/api/admin/applications`, applications);
}

export const asyncGetAllUsers = async () => {
	return await _sendRequest("GET", `${domainHttp}/api/admin/users`);
}

export const asyncDeleteUsers = async (users_id) => {
	return await _sendRequest("DELETE", `${domainHttp}/api/admin/users`, users_id);
}

export const connectToChat = (id) => {
	let ws = new WebSocket(`${domainWs}/chat/${id}`);
	return ws;
}
