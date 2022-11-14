import { highlightRow } from "../../../AnimationHandler.js";
import { Router } from "../../../router.js";
import { convert_products, create_table } from "../../../../model/DataAction.js";
import { async_deleteProduct, async_getUserProducts } from "../../../../model/Request.js";


let root = undefined;
let products = undefined;
let router = undefined;

async function _getUserProducts() {
	let response = await async_getUserProducts();
	let data = response.getBody();
	let status = response.getStatus();
	_react_getUserProducts(status, data);
}

function _react_getUserProducts(status, data){
	if (status == 401) {
		router.pageStart.render();
	} else if (status == 200) {
		products = convert_products(data);
		_render();
	}
}

function _render() {
	let div_products = document.createElement("div");
	div_products.id = "products";
	root.innerHTML = "";
	let btnPlace = document.createElement("div");
	btnPlace.id = "btn-place";

	let columns = ["id", "name", "date", "brand", "model", "price", "imageBase64"];
	let table = create_table(products, columns);
	let button = document.createElement("button");
	button.textContent = "Удалить";
	button.className = "btn-submit";
	button.addEventListener("click", _sendDeleteInfo);
	div_products.appendChild(table);
	btnPlace.appendChild(button);

	root.appendChild(div_products);
	root.appendChild(btnPlace);
	let rows = div_products.getElementsByTagName("tr");
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

async function _sendDeleteInfo() {
	let jsonProductsID = _getDeleteInfo();
	let response = await async_deleteProduct(jsonProductsID);
	let status = response.getStatus();
	react_deleteInfo(status);
}

function react_deleteInfo(status){
	if (status == 401) {
		router.pageStart(root);
	} else if (status == 204) {
		_getUserProducts();
	}
}

export default function init(_root) {
	root = _root;
	router = new Router();
	_getUserProducts();
}