import { Router } from "../../../router.js";
import { async_getCart } from "../../../../model/Request.js";
import { convert_products, create_table } from "../../../../model/DataAction.js";


let root = undefined;
let products = undefined;
let router = undefined;

async function _getAllProducts() {
	let response = await async_getCart();
	let data = response.getBody();
	let status = response.getStatus();
	_react_getAllProducts(status, data);
}

function _react_getAllProducts(status, data) {
	if (status == 401) {
		router.pageStart(root);
	} else if (status == 200) {
		products = convert_products(data);
		_render();
	}
}

function _render() {
	root.innerHTML = "";
	let div_products = document.createElement("div");
	div_products.id = "products";
	let columns = ["id", "name", "sellerName", "date", "brand", "model", "price", "image"];
	let table = create_table(products, columns);
	div_products.appendChild(table);
	root.appendChild(div_products);
}

export default function init(_root) {
	root = _root;
	router = new Router();
	_getAllProducts();
}
