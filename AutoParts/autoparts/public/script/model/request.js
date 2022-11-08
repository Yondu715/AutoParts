function _sendRequest(type, uri, data, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open(type, uri, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
	xhr.setRequestHeader("Login", localStorage.getItem("login"));

	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) {
			return;
		}
		let status = xhr.status;
		let response = xhr.responseText;
		callback(status, response);
	};

	if (data == null) {
		xhr.send();
	} else if ((type == "delete" || type == "get")) {
		xhr.setRequestHeader("Data", JSON.stringify(data));
		xhr.send();
	} else {
		xhr.send(JSON.stringify(data));
	}
}

export function getAllProducts(callback) {
	_sendRequest("get", "api/products/", null, callback);
}

export function getUserProducts(callback) {
	_sendRequest("get", "api/products/userProducts", null, callback);
}

export function auth(data, callback) {
	_sendRequest("post", "api/users/auth", data, callback);
}

export function reg(data, callback) {
	_sendRequest("post", "api/users/registration", data, callback);
}

export function saleProduct(data, callback) {
	_sendRequest("post", "api/products/sale", data, callback);
}

export function deleteProduct(data, callback) {
	_sendRequest("delete", "api/products/userProducts", data, callback);
}