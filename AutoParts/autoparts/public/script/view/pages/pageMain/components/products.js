import { Router } from "../../../router.js";
import { async_getAllProducts } from "../../../../model/Request.js";
import { createTableProducts, jsonToObjects } from "../../../../model/DataAction.js";
import { renderProductInfo } from "./productInfo.js";
import { fade } from "../../../viewTools/AnimationHandler.js";
import { Product } from "../../../../model/transport/Product.js";


let root = undefined;
let products = undefined;
let router = undefined;

async function _async_getAllProducts() {
	let response = await async_getAllProducts();
	let data = response.getBody();
	let status = response.getStatus();
	_react_getAllProducts(status, data);
}

function _react_getAllProducts(status, data) {
	switch (status) {
		case 401:
			router.pageStart();
			break;
		case 200:
			products = jsonToObjects(data, Product);
			_render();
			break;
	}
}

function _render() {
	root.innerHTML = "";
	let div_products = document.createElement("div");
	div_products.id = "products";
	let columns = ["id", "name", "sellerName", "date", "brand", "model", "price", "image"];
	let table = createTableProducts(products.length);
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

	table.addEventListener("click", (event) => {
		let row = event.target.closest("tr");
		let span = row.querySelector(".id");
		let id = span.textContent;
		renderProductInfo(root, id);
	});
}

export function renderProducts(_root) {
	root = _root;
	router = Router.getInstance();
	_async_getAllProducts();
}
