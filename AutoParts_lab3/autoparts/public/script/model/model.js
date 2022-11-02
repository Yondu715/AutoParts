var model = (function(){
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
	
	function _getAllProducts(callback){
		_sendRequest("get", "api/products/", null, callback);
	}

	function _getUserProducts(callback){
		_sendRequest("get", "api/products/userProducts", null, callback);
	}

	function _auth(user, callback){
		if (user == null){
			_sendRequest("post", "api/users/auth", user, callback);
		} else {
			_sendRequest("post", "api/users/auth", user.get(), callback);
		}
	}

	function _reg(user, callback){
		_sendRequest("post", "api/users/registration", user.get(), callback);
	}

	function _saleProduct(product, callback) {
		_sendRequest("post", "api/products/sale", product.get(), callback);
	}

	function _deleteProduct(data, callback){
		_sendRequest("delete", "api/products/userProducts", data, callback);
	}

	function _check_valid(data) {
		var keys = Object.keys(data.get());
		for (var i = 0; i < keys.length; i++) {
			if (data.get()[keys[i]] == "") return false;
		}
		return true;
	}

	function _create_table(products, columns) {
		var table = document.createElement("table");
		for (var i = 0; i < products.length; i++) {
			var row = document.createElement("tr");
			for (var j = 0; j < columns.length; j++) {
				var cell = document.createElement("td");
				cell.textContent = products[i].get()[columns[j]];
				row.appendChild(cell);
			}
			table.appendChild(row);
		}
		return table;
	}

	function User(){
		this.user = {};
	}

	User.prototype.set = function (user) {
		this.user = user;
	}

	User.prototype.get = function (){
		return this.user;
	}

	function Product(){
		this.product = {};
	}

	Product.prototype.set = function (product){
		this.product = product;
	}

	Product.prototype.get = function (){
		return this.product;
	}

	return {
		check_valid: _check_valid,
		create_table: _create_table,
		get_allProducts: _getAllProducts,
		get_userProducts: _getUserProducts,
		saleProduct: _saleProduct,
		deleteProduct: _deleteProduct,
		auth: _auth,
		reg: _reg,
		user: User,
		product: Product,
	}
})();