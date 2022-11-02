var model = (function(){
	function _check_valid(object) {
		var keys = Object.keys(object.get());
		for (var i = 0; i < keys.length; i++) {
			if (object.get()[keys[i]] == "") return false;
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

	function _convert_products(productsJSON){
		var res = [];
		for (var i = 0; i < productsJSON.length; i++) {
			var product = new dataObject.product();
			product.set(productsJSON[i]);
			res.push(product);
		}
		return res;
	}

	return {
		check_valid: _check_valid,
		create_table: _create_table,
		convert: _convert_products,
	}
})();