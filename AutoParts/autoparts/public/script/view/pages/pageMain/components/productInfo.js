import { Router } from "../../../router.js";
import { async_addToCart, async_getProductInfo } from "../../../../model/Request.js";
import { jsonToObjects, createProductInfo } from "../../../../model/DataAction.js";
import { fade } from "../../../viewTools/AnimationHandler.js";
import { Product } from "../../../../model/transport/Product.js";


let root = undefined;
let product_id = undefined;
let product = undefined;
let router = undefined;

async function _async_getProductInfo() {
	let response = await async_getProductInfo(product_id);
	let data = response.getBody();
	let status = response.getStatus();
	_react_getProductInfo(status, data);
}

function _react_getProductInfo(status, data) {
	switch (status) {
		case 401:
			router.pageStart();
			break;
		case 200:
			product = jsonToObjects(data, Product);
			_render();
			break;
	}
}

function _render() {
	root.innerHTML = "";
	let fields = ["name", "sellerName", "date", "brand", "model", "price"];
	let fields_ru = ["Название", "Продавец", "Дата публикации", "Марка", "Модель", "Цена"]

	let div_productInfo = createProductInfo();

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


	if (product.get()["sellerName"] != localStorage.getItem("login")) {
		let btnPlace = document.createElement("div");
		btnPlace.id = "btn-place";
		let button = document.createElement("button");
		button.textContent = "Добавить в корзину";
		button.classList.add("btn-submit");
		button.addEventListener("click", _async_addToCart);
		btnPlace.appendChild(button);
		root.appendChild(btnPlace);
	}
}

async function _async_addToCart() {
	let response = await async_addToCart(product);
	let status = response.getStatus();
	_react_addCart(status);
}

function _react_addCart(status) {
	switch (status) {
		case 401:
			router.pageStart();
			break;
	}
}

export function renderProductInfo(_root, _id) {
	root = _root;
	product_id = _id;
	router = Router.getInstance();
	_async_getProductInfo();
}
