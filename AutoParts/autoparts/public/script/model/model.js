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

	function _auth(data, callback){
		_sendRequest("post", "api/users/auth", data, callback);
	}

	function _reg(data, callback){
		_sendRequest("post", "api/users/registration", data, callback);
	}

	function _saleProduct(data, callback) {
		_sendRequest("post", "api/products/sale", data, callback);
	}

	function _deleteProduct(data, callback){
		_sendRequest("delete", "api/products/userProducts", data, callback);
	}

	function _check_valid(data) {
		var keys = Object.keys(data);
		for (var i = 0; i < keys.length; i++) {
			if (data[keys[i]] == "") return false;
		}
		return true;
	}

	function _create_table(data, columns) {
		var table = document.createElement("table");
		for (var i = 0; i < data.length; i++) {
			var row = document.createElement("tr");
			for (var j = 0; j < columns.length; j++) {
				var cell = document.createElement("td");
				cell.textContent = data[i][columns[j]];
				row.appendChild(cell);
			}
			table.appendChild(row);
		}
		return table;
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
	}
})();