import { Product } from "./transport/Product.js";

export function check_valid(object) {
	let keys = Object.keys(object.get());
	for (let i = 0; i < keys.length; i++) {
		if (object.get()[keys[i]] == "") return false;
	}
	return true;
}

export function create_table(products, columns) {
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


export function show_image(input, image_place) {
	let file = input.files[0];
	let reader = new FileReader();
	reader.onload = () => {
		image_place.src = reader.result;
	}
	reader.readAsDataURL(file);
}

export function convert_products(productsJSON) {
	let res = [];
	for (let i = 0; i < productsJSON.length; i++) {
		let product = new Product(productsJSON[i]);
		res.push(product);
	}
	return res;
}