import { dataObject } from "./transport/dataObject.js";

const dataAction = (function () {
	function _check_valid(object) {
		let keys = Object.keys(object.get());
		for (let i = 0; i < keys.length; i++) {
			if (object.get()[keys[i]] == "") return false;
		}
		return true;
	}

	function _create_table_prev(products, columns) {
		let table = document.createElement("table");
		for (let i = 0; i < products.length; i++) {
			let row = document.createElement("tr");
			let cell = document.createElement("td");
			let content_div = document.createElement("div");
			content_div.className = "item";
			for (let j = 0; j < columns.length; j++) {
				let span = document.createElement("span");
				span.id = columns[j];
				span.textContent = products[i].get()[columns[j]];
				content_div.appendChild(span);
			}

			cell.appendChild(content_div);
			row.appendChild(cell);
			table.appendChild(row);
		}
		return table;
	}

	function _create_table(products, columns) {
		let table = document.createElement("table");
		for (let i = 0; i < products.length; i++) {
			let row = document.createElement("tr");
			let cell = document.createElement("td");
			let content_div = document.createElement("div");
			content_div.className = "item";

			let image_div = document.createElement("div");
			image_div.className = "item_image";

			let main_info = document.createElement("div");
			main_info.className = "item_info";

			let price_info = document.createElement("div");
			price_info.className = "item_price";

			for (let j = 0; j < columns.length; j++) {
				let span = document.createElement("span");
				span.className = columns[j];
				span.textContent = products[i].get()[columns[j]];
				if (span.className == "imageBase64") {
					let image = document.createElement("img");
					image.src = span.textContent;
					image_div.appendChild(image);
				} else if (span.className == "cost") {
					span.textContent += "₽";
					price_info.appendChild(span);
				} else {
					main_info.appendChild(span);
				}
			}
			content_div.appendChild(image_div);
			content_div.appendChild(main_info);
			content_div.appendChild(price_info);
			cell.appendChild(content_div);
			row.appendChild(cell);
			table.appendChild(row);
		}
		return table;
	}


	function _show_image(input, image_place){
		let file = input.files[0];
		let reader = new FileReader();
		reader.onload = () => {
			image_place.src = reader.result;
		}
		reader.readAsDataURL(file);
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
		show_image: _show_image,
	}
})();

export { dataAction };