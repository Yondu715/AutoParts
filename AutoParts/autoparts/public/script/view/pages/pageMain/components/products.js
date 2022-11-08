import { Router } from "../../../router.js";
import { getAllProducts } from "../../../../model/Request.js";
import { convert_products, create_table } from "../../../../model/DataAction.js";


let root = undefined;
let products = undefined;
let router = undefined;

function _getAllProducts() {
	getAllProducts(_getAllProducts_callback);
}

function _getAllProducts_callback(status, data) {
	if (status == 401) {
		router.pageStart.render();
	} else if (status == 200) {
		let productsJSON = JSON.parse(data);
		products = convert_products(productsJSON);
		_render();
	}
}

function _render() {
	let div_products = document.createElement("div");
	div_products.id = "products";
	root.innerHTML = "";
	let columns = ["id", "name", "sellerName", "date", "brand", "model", "cost", "imageBase64"];
	let table = create_table(products, columns);
	div_products.appendChild(table);
	root.appendChild(div_products);
}

export default function _init(_root) {
	root = _root;
	router = new Router();
	_getAllProducts();
}
