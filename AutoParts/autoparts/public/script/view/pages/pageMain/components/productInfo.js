import { Router } from "../../../router.js";
import { async_getProductInfo } from "../../../../model/Request.js";
import { convert_products, create_productInfo } from "../../../../model/DataAction.js";


let root = undefined;
let product_id = undefined;
let product = undefined;
let router = undefined;

async function _getProductInfo() {
	let response = await async_getProductInfo(product_id);
	let data = response.getBody();
	let status = response.getStatus();
	_react_getProductInfo(status, data);
}

function _react_getProductInfo(status, data){
	if (status == 401) {
		router.pageStart(root);
	} else if (status == 200) {
		product = convert_products(data);
		_render();
	}
}

function _render() {
	root.innerHTML = "";
	let div_productInfo = create_productInfo(product);
	let btnPlace = document.createElement("div");
	btnPlace.id = "btn-place";
	let button = document.createElement("button");
	button.textContent = "Добавить в корзину";
	button.className = "btn-submit";
	btnPlace.appendChild(button);
	root.appendChild(div_productInfo);
	root.appendChild(btnPlace);
}

export default function init(_root, _id) {
	root = _root;
	product_id = _id;
	router = new Router();
	_getProductInfo();
}
