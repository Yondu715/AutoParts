import { Response } from "../model/transport/Response";


	const protocol = "http";
	const host = "localhost";
	const port = "8080";
	const name = "autoparts-1";
	const domain = `${protocol}://${host}:${port}/${name}`;

	const _sendRequest = async (type, uri, options, data) => {
		let headers = {
			"Content-type": "application/json; charset=utf-8",
			"Authorization": localStorage.getItem("token"),
		}
		if (options !== undefined & options !== null) {
			let keys = Object.keys(options);
			keys.forEach(key => {
				headers[key] = options[key];
			});
		}
		type = type.toLowerCase();
		let response;
		if (data === null || data === undefined) {
			response = await fetch(uri, { method: type, headers: headers });
		} else if ((type === "delete" || type === "get")) {
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
		return await _sendRequest("GET", `${domain}/api/products`);
	}

	export const asyncGetUserProducts = async () => {
		return await _sendRequest("GET", `${domain}/api/products/userProducts`);
	}

	export const asyncGetProductInfo = async (product_id) => {
		return await _sendRequest("GET", `${domain}/api/products/` + product_id);
	}

	export const asyncAuth = async (user) => {
		let data;
		try {
			data = user.get();
		} catch (error) {
			data = null;
		}
		return await _sendRequest("POST", `${domain}/api/users/auth`, null, data);
	}

	export const asyncReg = async (user) => {
		return await _sendRequest("POST", `${domain}/api/users/registration`, null, user.get());
	}


	export const asyncSaleProduct = async (product) => {
		return await _sendRequest("POST", `${domain}/api/products/sale`, null, product.get());
	}

	export const asyncDeleteProducts = async (products_id) => {
		return await _sendRequest("DELETE", `${domain}/api/products/userProducts`, null, products_id);
	}

	export const asyncAddToCart = async (product) => {
		return await _sendRequest("POST", `${domain}/api/users/cart`, null, product.get());
	}

	export const asyncGetCart = async () => {
		return await _sendRequest("GET", `${domain}/api/users/cart`);
	}

	export const asyncDeleteFromCart = async (products_id) => {
		return await _sendRequest("DELETE", `${domain}/api/users/cart`, null, products_id);
	}

	export const asyncGetAllApplications = async () => {
		return await _sendRequest("GET", `${domain}/api/admin/applications`);
	}

	export const asyncDeleteApplications = async (applications_id) => {
		return await _sendRequest("DELETE", `${domain}/api/admin/applications`, null, applications_id);
	}

	export const asyncAcceptApplications = async (applications) => {
		return await _sendRequest("PUT", `${domain}/api/admin/applications`, null, applications);
	}

	export const asyncGetAllUsers = async () => {
		return await _sendRequest("GET", `${domain}/api/admin/users`);
	}

	export const asyncDeleteUsers = async (users_id) => {
		return await _sendRequest("DELETE", `${domain}/api/admin/users`, null, users_id);
	}
