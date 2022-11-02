var request = (function () {
	function _sendRequest(type, uri, data, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open(type, uri, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
		xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
		xhr.setRequestHeader("Login", localStorage.getItem("login"));

		xhr.onreadystatechange = function () {
			if (this.readyState != 4) {
				return;
			}
			var statusRequest = this.statusText;
			var response = this.responseText;
			callback(statusRequest, response);
		};

		if ((type == "delete" || type == "get")) {
			xhr.setRequestHeader("Data", JSON.stringify(data));
			xhr.send();
		}
		else {
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

	function _deleteProduct(data, callback) {
		_sendRequest("delete", "api/products/userProducts", data, callback);
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