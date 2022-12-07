import { AnimationHandlerFactory } from "../../../viewTools/AnimationHandler.js";
import { createTableProducts } from "../../../viewTools/viewFuncs.js";

export function template(obj) {
	let animationHandler = AnimationHandlerFactory.createInstance();
	let componentWrap = document.createElement("div");
	componentWrap.classList.add("component-wrap");
	componentWrap.innerHTML = `
		<style>
			@import "public/style/general.css";
			@import "public/style/mainPage.css";
			@import "public/style/animations.css";
		</style>	
		<div id='products' class='component-content'></div>`;
	let div_products = componentWrap.querySelector("#products");
	let table = createTableProducts(obj._products.length);
	table.classList.add("table");
	
	let columns = ["id", "name", "sellerName", "date", "brand", "model", "price", "image"];
	let rows = table.querySelectorAll("tr");
	let image_divs = table.querySelectorAll(".item-image");
	let main_divs = table.querySelectorAll(".item-info");
	let price_divs = table.querySelectorAll(".item-price");
	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < columns.length; j++) {
			let span = document.createElement("span");
			span.classList.add(columns[j]);
			span.textContent = obj._products[i].get()[columns[j]];
			if (span.classList.contains("image")) {
				let image = document.createElement("img");
				image.src = span.textContent;
				image_divs[i].appendChild(image);
			} else if (span.classList.contains("price")) {
				span.textContent += " ₽";
				price_divs[i].appendChild(span);
			} else {
				main_divs[i].appendChild(span);
			}
		}
	}
	div_products.appendChild(table);
	animationHandler.fade(div_products, 1.2, 0);
	return componentWrap;
}
