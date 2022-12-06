import { AnimationHandlerFactory } from "../../../viewTools/AnimationHandler.js";
import { images } from "../../../viewTools/images.js";
import { dragAndDrop, showImage } from "../../../viewTools/viewFuncs.js";

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
		<div id='sale' class='component-content'>
			<div class='product-info'></div>
			<div class='product-image'></div>
		</div>
		<div id='btn_place'>
			<button id='accept' class='btn-submit'>Выставить на продажу</button>
		</div>
	`;

	let product_info = componentWrap.querySelector(".product-info");
	let product_image = componentWrap.querySelector(".product-image");

	let fields = ["name", "brand", "model", "price"];
	let fields_ru = ["Название", "Марка", "Модель", "Стоимость"];
	for (let i = 0; i < fields.length; i++) {
		let container = document.createElement("div");
		container.className = fields[i];

		let input = document.createElement("input");
		input.classList.add("text");
		input.id = fields[i];
		input.autocomplete = "off";

		let label = document.createElement("label");
		label.textContent = fields_ru[i] + ":";

		let span = document.createElement("span");
		span.classList.add("bar");

		container.appendChild(label);
		container.appendChild(input);
		container.appendChild(span);

		product_info.appendChild(container);
	}

	let sale_status = document.createElement("span");
	sale_status.id = "sale_status";

	let label_input_dropArea = document.createElement("label");
	label_input_dropArea.classList.add("input-file");
	let input_image = document.createElement("input");
	input_image.id = "input_image";
	input_image.type = "file";
	input_image.accept = "image\\*";
	let span_dropArea = document.createElement("span");
	span_dropArea.textContent = "Выберите файл";
	label_input_dropArea.appendChild(span_dropArea);
	label_input_dropArea.appendChild(input_image);

	let dropArea = document.createElement("div");
	dropArea.classList.add("dropArea");
	let image = document.createElement("img");
	image.id = "image";
	image.src = images["dragAndDrop"];

	dropArea.appendChild(image);
	product_image.appendChild(dropArea);
	product_image.appendChild(label_input_dropArea);

	product_info.appendChild(sale_status);

	let div_sale = componentWrap.querySelector("#sale");
	dragAndDrop(dropArea, input_image, image);
	input_image.addEventListener("change", () => showImage(input_image, image));
	animationHandler.fade(div_sale, 0.8, 0);
	return componentWrap;
}