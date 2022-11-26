import { Router } from "../../../router.js";
import { async_addToCart, async_getProductInfo } from "../../../../model/Request.js";
import { jsonToObjects, create_productInfo } from "../../../../model/DataAction.js";
import { fade } from "../../../AnimationHandler.js";
import { Product } from "../../../../model/transport/Product.js";


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
		product = jsonToObjects(data, Product);
		_render();
	}
}

function _render() {
	root.innerHTML = "";
	let fields = ["name", "sellerName", "date", "brand", "model", "price"];
	let fields_ru = ["Название", "Продавец", "Дата публикации", "Марка", "Модель", "Цена"]

	let div_productInfo = create_productInfo();

	let div_info = div_productInfo.querySelector(".info");
	let image = div_productInfo.querySelector(".image");
	for (let i = 0; i < fields.length; i++) {
		let span = document.createElement("span");
		span.textContent = fields_ru[i] + ": " + product.get()[fields[i]];
		if (fields[i] == "price") {
			span.textContent += " ₽";
		}
		div_info.appendChild(span);
	}
	image.src = product.get()["image"];
	root.appendChild(div_productInfo);
	fade(div_productInfo, 0.8, 0);


	if (product.get()["sellerName"] != localStorage.getItem("login")){
		let btnPlace = document.createElement("div");
		btnPlace.id = "btn-place";
		let button = document.createElement("button");
		button.textContent = "Добавить в корзину";
		button.classList.add("btn-submit");
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
