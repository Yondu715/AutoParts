import { Response } from "./transport/Response.js";

async function _sendRequest(type, uri, options, data) {
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
	
	type = type.toLowerCase();
	let response;
	if (data == null || data == undefined) {
		response = await fetch(uri, { method: type, headers: headers });
	} else if ((type == "delete" || type == "get")) {
		headers["Data"] = JSON.stringify(data);
		response = await fetch(uri, { method: type, headers: headers });
	} else {
		response = await fetch(uri, { method: type, headers: headers, body: JSON.stringify(data) });
	}
	
	let json;
	json = await response.text();
	try {
		json = JSON.parse(json);
	} catch (error) {
	}
	return new Response(response.status, json);
}


export async function async_getAllProducts() {
	return await _sendRequest("GET", "api/products");
}

export async function async_getUserProducts() {
	return await _sendRequest("GET", "api/products/userProducts");
}

export async function async_getProductInfo(product_id){
	return await _sendRequest("GET", "api/products/" + product_id);
}

export async function async_auth(user) {
	let data = null;
	try {
		data = user.get();
	} catch (error) { 
	}
	return await _sendRequest("POST", "api/users/auth", null, data);
}

export async function async_reg(user) {
	return await _sendRequest("POST", "api/users/registration", null, user.get());
}

export async function async_saleProduct(product) {
	return await _sendRequest("POST", "api/products/sale", null, product.get());
}

export async function async_deleteProducts(products_id) {
	return await _sendRequest("DELETE", "api/products/userProducts", null, products_id);
}

export async function async_addToCart(product){
	return await _sendRequest("POST", "api/users/cart", null, product.get());
}

export async function async_getCart() {
	return await _sendRequest("GET", "api/users/cart");
}

export async function async_getAllApplications(){
	return await _sendRequest("GET", "api/admin/applications");
}

export async function async_deleteApplications(applications_id){
	return await _sendRequest("DELETE", "api/admin/applications", null, applications_id);
}

export async function async_acceptApplications(applications){
	return await _sendRequest("PUT", "api/admin/applications", null, applications);
}

export async function async_getAllUsers() {
	return await _sendRequest("GET", "api/admin/users");
}

export async function async_deleteUsers(users_id) {
	return await _sendRequest("DELETE", "api/admin/users", null, users_id);
}