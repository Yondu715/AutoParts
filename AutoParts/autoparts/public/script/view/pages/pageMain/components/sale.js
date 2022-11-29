import { Router } from "../../../router.js";
import { Product } from "../../../../model/transport/Product.js";
import { async_saleProduct } from "../../../../model/Request.js";
import { checkValid } from "../../../../model/DataAction.js";
import { dragAndDrop, showImage } from "../../../viewTools/viewFuncs.js";
import { images } from "../../../viewTools/images.js";
import { fade } from "../../../viewTools/AnimationHandler.js";

let root = undefined;
let error_span = undefined;
let router = undefined;
let main_root = undefined;

function _render() {
	root.innerHTML = "";

	let btnPlace = document.createElement("div");
	btnPlace.id = "btn-place";

	let div_sale = document.createElement("div");
	div_sale.id = "sale";

	let product_fields = document.createElement("div");
	product_fields.classList.add("product_info");

	let product_image = document.createElement("div");
	product_image.classList.add("product_image");

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

		product_fields.appendChild(container);
	}
	let button = document.createElement("button");
	button.textContent = "Выставить на продажу";
	button.classList.add("btn-submit");
	button.addEventListener("click", _async_sendSaleInfo);

	let span = document.createElement("span");
	span.id = "sale-status";

	let label_input_dropArea = document.createElement("label");
	label_input_dropArea.classList.add("input_file");
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

	btnPlace.appendChild(button);
	product_fields.appendChild(span);
	div_sale.appendChild(product_fields);
	div_sale.appendChild(product_image);
	root.appendChild(div_sale);
	root.appendChild(btnPlace);
	fade(div_sale, 0.8, 0);
	error_span = document.getElementById("sale-status");

	dragAndDrop(dropArea, input_image, image);
	input_image.addEventListener("change", () => {
		showImage(input_image, image);
	})
}

function _getSaleInfo() {
	let input_image = document.getElementById("input_image");
	let image = document.getElementById("image");
	let jsonSale = {};
	let fields = ["name", "brand", "model", "price"];
	for (let i = 0; i < fields.length; i++) {
		let value = document.getElementById(fields[i]).value;
		jsonSale[fields[i]] = value;
	}
	jsonSale["sellerName"] = localStorage.getItem("login");
	jsonSale["price"] = Number(jsonSale["price"]);

	let file = input_image.files[0];
	if (file != undefined) {
		jsonSale["image"] = image.src;
	}
	let product = new Product(jsonSale);
	return product;
}

async function _async_sendSaleInfo() {
	let product = _getSaleInfo();
	if (!checkValid(product)) {
		error_span.textContent = "Не все поля были заполнены";
		return;
	}
	let response = await async_saleProduct(product);
	let status = response.getStatus();
	_react_saleInfo(status);
}

function _react_saleInfo(status) {
	switch (status) {
		case 401: {
			router.pageStart(main_root);
		}
		default: {
			error_span.textContent = "";
			let fields = document.getElementsByTagName("input");
			for (let i = 0; i < fields.length; i++) {
				fields[i].value = "";
			}
			let image = document.getElementById("image");
			image.src = images["dragAndDrop"];
		}
	}
}

export function renderSale(_main_root, _root) {
	main_root = _main_root;
	root = _root;
	router = new Router();
	_render();
}