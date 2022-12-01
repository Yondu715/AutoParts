import { fade, highlightRow } from "../../../viewTools/AnimationHandler.js";
import { Router } from "../../../router.js";
import { createTableProducts, jsonToObjects } from "../../../../model/DataAction.js";
import { async_deleteProducts, async_getUserProducts } from "../../../../model/Request.js";
import { Product } from "../../../../model/transport/Product.js";


let root = undefined;
let products = undefined;
let router = undefined;

async function _async_getUserProducts() {
	let response = await async_getUserProducts();
	let data = response.getBody();
	let status = response.getStatus();
	_react_getUserProducts(status, data);
}

function _react_getUserProducts(status, data) {
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
	let div_products = document.createElement("div");
	div_products.id = "products";
	root.innerHTML = "";
	let btnPlace = document.createElement("div");
	btnPlace.id = "btn-place";

	let columns = ["id", "name", "date", "brand", "model", "price", "image"];
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

	let button = document.createElement("button");
	button.textContent = "Удалить";
	button.classList.add("btn-submit");
	button.classList.add("btn_red")
	button.addEventListener("click", _async_sendDeleteInfo);
	div_products.appendChild(table);
	btnPlace.appendChild(button);

	root.appendChild(div_products);
	root.appendChild(btnPlace);
	fade(div_products, 1.2, 0);
	highlightRow(rows);
}

/* DELETE PRODUCT */

function _getDeleteInfo() {
	let rows = document.getElementsByTagName("tr");
	let products_id = [];
	for (let i = 0; i < rows.length; i++) {
		if (rows[i].style.background != "") {
			let cell = rows[i].querySelector(".id");
			let product = {
				id: Number(cell.innerText)
			}
			products_id.push(product);
		}
	}
	return products_id;
}

async function _async_sendDeleteInfo() {
	let jsonProductsID = _getDeleteInfo();
	let response = await async_deleteProducts(jsonProductsID);
	let status = response.getStatus();
	react_deleteInfo(status);
}

function react_deleteInfo(status) {
	switch (status) {
		case 401:
			router.pageStart();
			break;
		case 204:
			async_getUserProducts();
			break;
	}
}

export function renderUserProducts(_root) {
	root = _root;
	router = Router.getInstance();
	_async_getUserProducts();
}