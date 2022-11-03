const request = (function () {
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
			let statusRequest = xhr.statusText;
			let response = xhr.responseText;
			callback(statusRequest, response);
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

	function _getAllProducts(callback) {
		_sendRequest("get", "api/products/", null, callback);
	}

	function _getUserProducts(callback) {
		_sendRequest("get", "api/products/userProducts", null, callback);
	}

	function _auth(user, callback) {
		if (user == null) {
			_sendRequest("post", "api/users/auth", user, callback);
		} else {
			_sendRequest("post", "api/users/auth", user.get(), callback);
		}
	}

	function _reg(user, callback) {
		_sendRequest("post", "api/users/registration", user.get(), callback);
	}

	function _saleProduct(product, callback) {
		_sendRequest("post", "api/products/sale", product.get(), callback);
	}

	function _deleteProduct(products_id, callback) {
		_sendRequest("delete", "api/products/userProducts", products_id, callback);
	}

	return {
		get_allProducts: _getAllProducts,
		get_userProducts: _getUserProducts,
		saleProduct: _saleProduct,
		deleteProduct: _deleteProduct,
		auth: _auth,
		reg: _reg,
	}
})();

export {request};