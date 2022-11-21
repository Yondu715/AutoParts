import { Response } from "./transport/Response.js";


async function _sendRequest(type, uri, options, data) {
	type = type.toLowerCase();
	let request;
	let headers = {
		"Content-type": "application/json; charset=utf-8",
		"Authorization": localStorage.getItem("token"),
	}

	if (options != undefined || options != null) {
		let keys = Object.keys(options);
		for (let i = 0; i < keys.length; i++) {
			headers[keys[i]] = options[keys[i]];
		}
	}
	
	if (data == null || data == undefined) {
		request = fetch(uri, { method: type, headers: headers });
	} else if ((type == "delete" || type == "get")) {
		headers["Data"] = JSON.stringify(data);
		request = fetch(uri, { method: type, headers: headers });
	} else {
		request = fetch(uri, { method: type, headers: headers, body: JSON.stringify(data) });
	}
	
	let response = await request;
	let json;
	try {
		json = await response.json();
	} catch (error) {
		json = null;
	}
	return new Response(response.status, json);
}


export async function async_getAllProducts() {
	return await _sendRequest("GET", "api/products");
}

export async function async_getUserProducts() {
	return await _sendRequest("GET", "api/products/userProducts", { "Login": localStorage.getItem("login") });
}

export async function async_getProductInfo(product_id){
	return await _sendRequest("GET", "api/products/" + product_id);
}

export async function async_auth(user) {
	let data;
	try {
		data = user.get();
	} catch (error) { 
		data = null;
	}
	return await _sendRequest("POST", "api/users/auth", null, data);
}

export async function async_reg(user) {
	return await _sendRequest("POST", "api/users/registration", null, user.get());
}

export async function async_saleProduct(product) {
	return await _sendRequest("POST", "api/products/sale", { "Login": localStorage.getItem("login") }, product.get());
}

export async function async_deleteProduct(products_id) {
	return await _sendRequest("DELETE", "api/products/userProducts", null, products_id);
}

export async function async_addToCart(product){
	return await _sendRequest("POST", "api/users/cart", { "Login": localStorage.getItem("login") }, product.get());
}

export async function async_getCart() {
	return await _sendRequest("GET", "api/users/cart", { "Login": localStorage.getItem("login") });
}