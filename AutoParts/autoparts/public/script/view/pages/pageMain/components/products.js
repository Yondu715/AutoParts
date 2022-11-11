import { Router } from "../../../router.js";
import { getAllProducts } from "../../../../model/Request.js";
import { convert_products, create_table } from "../../../../model/DataAction.js";
import renderProductInfo from "./productInfo.js";


let root = undefined;
let products = undefined;
let router = undefined;

async function _getAllProducts() {
	let response = await getAllProducts();
	let data = response.getBody();
	let status = response.getStatus();
	_react_getAllProducts(status, data);
}

function _react_getAllProducts(status, data){
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
	let columns = ["id", "name", "sellerName", "date", "brand", "model", "price", "imageBase64"];
	let table = create_table(products, columns);
	div_products.appendChild(table);
	root.appendChild(div_products);
	
	table.addEventListener("click", (event) => {
		let row = event.target.closest("tr");
		let span = row.querySelector(".id");
		let id = span.textContent;
		renderProductInfo(root, id);
	});
}

export default function init(_root) {
	root = _root;
	router = new Router();
	_getAllProducts();
}
