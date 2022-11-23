import { Router } from "../../../router.js";
import { async_addToCart, async_getProductInfo } from "../../../../model/Request.js";
import { convert_products, create_productInfo } from "../../../../model/DataAction.js";


let root = undefined;
let product_id = undefined;
let product = undefined;
let router = undefined;
let main_root = undefined;

async function _getProductInfo() {
	let response = await async_getProductInfo(product_id);
	let data = response.getBody();
	let status = response.getStatus();
	_react_getProductInfo(status, data);
}

function _react_getProductInfo(status, data){
	if (status == 401) {
		router.pageStart(main_root);
	} else if (status == 200) {
		product = convert_products(data);
		_render();
	}
}

function _render() {
	root.innerHTML = "";
	let div_productInfo = create_productInfo(product);
	console.log(product);
	root.appendChild(div_productInfo);
	if (product.get()["sellerName"] != localStorage.getItem("login")){
		let btnPlace = document.createElement("div");
		btnPlace.id = "btn-place";
		let button = document.createElement("button");
		button.textContent = "Добавить в корзину";
		button.className = "btn-submit";
		button.addEventListener("click", _addToCart);
		btnPlace.appendChild(button);
		root.appendChild(btnPlace);
	}
}

async function _addToCart(){
	let response = await async_addToCart(product);
	let status = response.getStatus();
	_react_addCart(status);
}

function _react_addCart(status){
	if (status == 401) {
		router.pageStart(root);
	}
}

export default function init(_main_root, _root, _id) {
	main_root = _main_root;
	root = _root;
	product_id = _id;
	router = new Router();
	_getProductInfo();
}
