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
			if (span.className == "image") {
				let image = document.createElement("img");
				image.src = span.textContent;
				image_div.appendChild(image);
			} else if (span.className == "price") {
				span.textContent += " ₽";
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

export function create_productInfo(product){

	let fields = ["name", "sellerName", "date", "brand", "model", "price"];
	let fields_ru = ["Название", "Продавец", "Дата публикации", "Марка", "Модель", "Цена"]

	let div_productInfo = document.createElement("div");
	div_productInfo.id = "product-info";

	let left_part = document.createElement("div");
	left_part.className = "left-part";
	let right_part = document.createElement("div");
	right_part.className = "right-part";

	let div_info = document.createElement("div");
	div_info.className = "info";

	for (let i = 0; i < fields.length; i++) {
		let span = document.createElement("span");
		span.textContent = fields_ru[i] + ": " + product.get()[fields[i]];
		if (fields[i] == "price") {
			span.textContent += " ₽";
		}
		div_info.appendChild(span);
	}

	let div_image = document.createElement("div");
	div_image.className = "product-image";
	let image = document.createElement("img");
	image.className = "image";
	image.src = product.get()["image"];
	div_image.appendChild(image);

	left_part.appendChild(div_info);
	right_part.appendChild(div_image);
	
	div_productInfo.appendChild(left_part);
	div_productInfo.appendChild(right_part);
	return div_productInfo;
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
	if (!Array.isArray(productsJSON)){
		let product = new Product(productsJSON);
		return product;
	}

	let res = [];
	for (let i = 0; i < productsJSON.length; i++) {
		let product = new Product(productsJSON[i]);
		res.push(product);
	}
	return res;
}