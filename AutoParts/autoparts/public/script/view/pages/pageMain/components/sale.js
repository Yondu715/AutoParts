import { dataObject, dataAction, request } from "../../../../model/modelBundle.js";
import router from "../../../router.js";

export default (function () {
	let root = undefined;
	let error_span = undefined;

	/* SALE PRODUCT */

	function _render() {
		let btnPlace = document.createElement("div");
		btnPlace.id = "btn-place";
		root.innerHTML = "";

		let div_sale = document.createElement("div");
		div_sale.id = "sale";

		let product_fields = document.createElement("div");
		product_fields.className = "product_info";

		let product_image = document.createElement("div");
		product_image.className = "product_image";

		let fields = ["name", "brand", "model", "cost"];
		let fields_ru = ["Название", "Марка", "Модель", "Стоимость"];
		for (let i = 0; i < fields.length; i++) {
			let container = document.createElement("div");
			container.className = fields[i];

			let input = document.createElement("input");
			input.className = "text";
			input.id = fields[i];
			input.autocomplete = "off";

			let label = document.createElement("label");
			label.textContent = fields_ru[i] + ":";

			let span = document.createElement("span");
			span.className = "bar";

			container.appendChild(label);
			container.appendChild(input);
			container.appendChild(span);

			product_fields.appendChild(container);
		}
		let button = document.createElement("button");
		button.textContent = "Выставить на продажу";
		button.className = "btn-submit";
		button.addEventListener("click", _sendSaleInfo);

		let span = document.createElement("span");
		span.id = "sale-status";

		let input_image = document.createElement("input");
		input_image.id = "input_image";
		input_image.type = "file";
		input_image.accept = "image\\*";
		let image = document.createElement("img");
		image.id = "image";

		product_image.appendChild(image);
		product_image.appendChild(input_image);
		btnPlace.appendChild(button);
		product_fields.appendChild(span);
		div_sale.appendChild(product_fields);
		div_sale.appendChild(product_image);
		root.appendChild(div_sale);
		root.appendChild(btnPlace);
		error_span = document.getElementById("sale-status");

		input_image.addEventListener("change", () => {
			dataAction.show_image(input_image, image);
		})
	}

	function _getSaleInfo() {
		let input_image = document.getElementById("input_image");
		let image = document.getElementById("image");
		let jsonSale = {};
		let fields = ["name", "brand", "model", "cost"];
		for (let i = 0; i < fields.length; i++) {
			let value = document.getElementById(fields[i]).value;
			jsonSale[fields[i]] = value;
		}
		jsonSale["sellerName"] = localStorage.getItem("login");
		jsonSale["cost"] = Number(jsonSale["cost"]);
		jsonSale["imageBase64"] = "";

		let file = input_image.files[0];
		if (file != undefined) {
			jsonSale["imageBase64"] = image.src;
		}
		let product = new dataObject.product(jsonSale);
		return product;
	}

	function _sendSaleInfo() {
		let product = _getSaleInfo();
		if (dataAction.check_valid(product)) {
			request.saleProduct(product, _sendSaleInfo_callback);
		} else {
			error_span.textContent = "Не все поля были заполнены";
		}
	}

	function _sendSaleInfo_callback(status) {
		if (status == 401) {
			router.pageStart(root);
		} else {
			error_span.textContent = "";
			let fields = document.getElementsByTagName("input");
			for (let i = 0; i < fields.length; i++) {
				fields[i].value = "";
			}
			let image = document.getElementById("image");
			image.src = "";
		}
	}

	function _init(_root) {
		root = _root;
		_render();
	}

	return {
		render: _init,
	};

})();