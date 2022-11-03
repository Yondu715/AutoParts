import { dataObject } from "../transport/dataObject.js";

const dataAction = (function () {
	function _check_valid(object) {
		let keys = Object.keys(object.get());
		for (let i = 0; i < keys.length; i++) {
			if (object.get()[keys[i]] == "") return false;
		}
		return true;
	}

	function _create_table(products, columns) {
		let table = document.createElement("table");
		for (let i = 0; i < products.length; i++) {
			let row = document.createElement("tr");
			for (let j = 0; j < columns.length; j++) {
				let cell = document.createElement("td");
				cell.textContent = products[i].get()[columns[j]];
				row.appendChild(cell);
			}
			table.appendChild(row);
		}
		return table;
	}

	function _convert_products(productsJSON) {
		let res = [];
		for (let i = 0; i < productsJSON.length; i++) {
			let product = new dataObject.product(productsJSON[i]);
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

export { dataAction };