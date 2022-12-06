import { AnimationHandlerFactory } from "../../../viewTools/AnimationHandler.js";

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
		<div id='products' class='component-content'></div>
	`;
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

function createTableProducts(length) {
	let table = document.createElement("table");
	for (let i = 0; i < length; i++) {
		let row = document.createElement("tr");
		let cell = document.createElement("td");
		let content_div = document.createElement("div");
		content_div.classList.add("item");

		let image_div = document.createElement("div");
		image_div.classList.add("item-image");

		let main_info = document.createElement("div");
		main_info.classList.add("item-info");

		let price_info = document.createElement("div");
		price_info.classList.add("item-price");

		content_div.appendChild(image_div);
		content_div.appendChild(main_info);
		content_div.appendChild(price_info);
		cell.appendChild(content_div);
		row.appendChild(cell);
		table.appendChild(row);
	}
	return table;
}