import { Response } from "./transport/Response.js";

class RequestManager {

	async _sendRequest(type, uri, options, data) {
		let headers = {
			"Content-type": "application/json; charset=utf-8",
			"Authorization": localStorage.getItem("token"),
		}
		
		if (options != undefined || options != null) {
			let keys = Object.keys(options);
			keys.forEach(key => {
				headers[key] = options[key];
			});
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
		
		let json = null;
		try {
			json = await response.json();
		} catch (error) {
		}
		return new Response(response.status, json);
	}
	
	
	async async_getAllProducts() {
		return await this._sendRequest("GET", "api/products");
	}
	
	async async_getUserProducts() {
		return await this._sendRequest("GET", "api/products/userProducts");
	}
	
	async async_getProductInfo(product_id){
		return await this._sendRequest("GET", "api/products/" + product_id);
	}
	
	async async_auth(user) {
		let data = null;
		try {
			data = user.get();
		} catch (error) { 
		}
		return await this._sendRequest("POST", "api/users/auth", null, data);
	}
	
	async async_reg(user) {
		return await this._sendRequest("POST", "api/users/registration", null, user.get());
	}
	
	async async_saleProduct(product) {
		return await this._sendRequest("POST", "api/products/sale", null, product.get());
	}
	
	async async_deleteProducts(products_id) {
		return await this._sendRequest("DELETE", "api/products/userProducts", null, products_id);
	}
	
	async async_addToCart(product){
		return await this._sendRequest("POST", "api/users/cart", null, product.get());
	}
	
	async async_getCart() {
		return await this._sendRequest("GET", "api/users/cart");
	}

	async async_deleteFromCart(products_id){
		return await this._sendRequest("DELETE", "api/users/cart", null, products_id);
	}
	
	async async_getAllApplications(){
		return await this._sendRequest("GET", "api/admin/applications");
	}
	
	async async_deleteApplications(applications_id){
		return await this._sendRequest("DELETE", "api/admin/applications", null, applications_id);
	}
	
	async async_acceptApplications(applications){
		return await this._sendRequest("PUT", "api/admin/applications", null, applications);
	}
	
	async async_getAllUsers() {
		return await this._sendRequest("GET", "api/admin/users");
	}
	
	async async_deleteUsers(users_id) {
		return await this._sendRequest("DELETE", "api/admin/users", null, users_id);
	}
}

export class RequestManagerFactory {
	static _rm = null;

	static _createInstance() {
		return new RequestManager();
	}

	static createInstance() {
		if (RequestManagerFactory._rm === null) {
			RequestManagerFactory._rm = RequestManagerFactory._createInstance();
		}
		return RequestManagerFactory._rm;
	}
}
