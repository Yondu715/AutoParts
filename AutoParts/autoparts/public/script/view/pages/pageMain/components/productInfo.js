import { Router } from "../../../router.js";
import { getAllProducts } from "../../../../model/Request.js";
import { convert_products, create_table } from "../../../../model/DataAction.js";


let root = undefined;
let product = undefined;
let router = undefined;

async function _getProductInfo() {
	
}

function _render() {
	let div_products = document.createElement("div");
	div_products.id = "products";
	root.innerHTML = "";

}

export default function _init(_root) {
	root = _root;
	router = new Router();
	_getAllProducts();
}
