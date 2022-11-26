import { Router } from "../../../router.js";
import { async_getCart } from "../../../../model/Request.js";
import { jsonToObjects, create_table_products } from "../../../../model/DataAction.js";
import { fade } from "../../../AnimationHandler.js";
import { Product } from "../../../../model/transport/Product.js";


let root = undefined;
let products = undefined;
let router = undefined;
let main_root = undefined;

async function _getCart() {
	let response = await async_getCart();
	let data = response.getBody();
	let status = response.getStatus();
	_react_getCart(status, data);
}

function _react_getCart(status, data) {
	if (status == 401) {
		router.pageStart(main_root);
	} else if (status == 200) {
		products = jsonToObjects(data, Product);
		_render();
	}
}

function _render() {
	root.innerHTML = "";
	let div_products = document.createElement("div");
	div_products.id = "products";
	let columns = ["id", "name", "sellerName", "date", "brand", "model", "price", "image"];
	let table = create_table_products(products.length);
	table.classList.add("table");
	let rows = table.querySelectorAll("tr");
	let image_divs = table.querySelectorAll(".item_image");
	let main_divs = table.querySelectorAll(".item_info");
	let price_divs = table.querySelectorAll(".item_price");
	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < columns.length; j++) {
			let span = document.createElement("span");
			span.classList.add(columns[j]);
			span.textContent = products[i].get()[columns[j]];
			if (span.classList.contains("image")) {
				let image = document.createElement("img");
				image.src = span.textContent;
				image_divs[i].appendChild(image);
			} else if (span.classList.contains("price")) {
				span.textContent += " ₽";
				price_divs[i].appendChild(span);
			} else {
				main_divs[i].appendChild(span);
			}
		}
	}
	div_products.appendChild(table);
	root.appendChild(div_products);
	fade(div_products, 1.2, 0);
}

export default function init(_main_root, _root) {
	main_root = _main_root;
	root = _root;
	router = new Router();
	_getCart();
}
