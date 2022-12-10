import { AnimationHandlerFactory } from "../../../viewUtils/AnimationHandler.js";
import { createProductInfo } from "../../../viewUtils/viewFuncs.js";

export function template(obj) {
	let animationHandler = AnimationHandlerFactory.createInstance();
	let componentWrap = document.createElement("div");
	componentWrap.classList.add("component-wrap");
	componentWrap.innerHTML = `
		<style>
			@import "public/style/general.css";
			@import "public/style/mainPage.css";
			@import "public/style/animations.css";
		</style>`;
	let fields = ["name", "sellerName", "date", "brand", "model", "price"];
	let fields_ru = ["Название", "Продавец", "Дата публикации", "Марка", "Модель", "Цена"]

	let div_productInfo = createProductInfo();
	div_productInfo.classList.add("component-content");

	let div_info = div_productInfo.querySelector(".info");
	for (let i = 0; i < fields.length; i++) {
		let span = document.createElement("span");
		span.textContent = fields_ru[i] + ": " + obj._product.get()[fields[i]];
		if (fields[i] == "price") {
			span.textContent += " ₽";
		}
		div_info.appendChild(span);
	}
	componentWrap.appendChild(div_productInfo);

	let image = componentWrap.querySelector(".image");
	image.src = obj._product.get()["image"];

	if (obj._product.get()["sellerName"] != localStorage.getItem("login")) {
		let btnPlace = document.createElement("div");
		btnPlace.id = "btn_place";
		let button = document.createElement("button");
		button.textContent = "Добавить в корзину";
		button.classList.add("btn-submit");
		btnPlace.appendChild(button);
		componentWrap.appendChild(btnPlace);
	}
	animationHandler.fade(div_productInfo, 1.2, 0);
	return componentWrap;
}