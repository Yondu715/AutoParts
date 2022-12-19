import { RouterFactory } from "../../../router/router";
import { Product } from "../../../../model/transport/Product";
import { RequestManagerFactory } from "../../../../model/RequestManager";
import { checkValid } from "../../../../model/DataAction";
import { images } from "../../../viewUtils/images";
import { template } from "./template";


class SaleComp extends HTMLElement {
	_error_span = undefined;
	_router = RouterFactory.createInstance();
	_requestManager = RequestManagerFactory.createInstance();
	_root = undefined;

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
	}

	connectedCallback() {
		this._render();
	}

	_render() {
		this._root.replaceChildren();
		this._root.innerHTML = template(this);

		let dropArea = this._root.querySelector(".dropArea");
		let input_image = this._root.querySelector("#input_image");
		let image = this._root.querySelector("#image");
		this._dragAndDrop(dropArea, input_image, image);
		input_image.addEventListener("change", () => this._showImage(input_image, image));

		this._error_span = this._root.querySelector("#sale_status");
		let button = this._root.querySelector("#accept");
		button.addEventListener("click", this._async_sendSaleInfo.bind(this));
	}

	_getSaleInfo() {
		let input_image = this._root.querySelector("#input_image");
		let image = this._root.querySelector("#image");
		let jsonSale = {};
		let fields = ["name", "brand", "model", "price"];
		fields.forEach(field => {
			let value = this._root.querySelector(`#${field}`).value;
			jsonSale[field] = value;
		});
		jsonSale["sellerName"] = localStorage.getItem("login");
		jsonSale["price"] = Number(jsonSale["price"]);

		let file = input_image.files[0];
		if (file != undefined) {
			jsonSale["image"] = image.src;
		}
		let product = new Product(jsonSale);
		return product;
	}

	async _async_sendSaleInfo() {
		let product = this._getSaleInfo();
		if (!checkValid(product)) {
			this._error_span.textContent = "Не все поля были заполнены";
			return;
		}
		let response = await this._requestManager.async_saleProduct(product);
		let status = response.getStatus();
		this._react_saleInfo(status);
	}

	_react_saleInfo(status) {
		switch (status) {
			case 401:
				this._router.go();
				break;
			default:
				this._error_span.textContent = "";
				let fields = this._root.querySelectorAll("input");
				fields.forEach(field => {
					field.value = "";
				});
				let image = this._root.querySelector("#image");
				image.src = images["dragAndDrop"];
				break;
		}
	}

	_showImage(input, image_place) {
		let file = input.files[0];
		let reader = new FileReader();
		reader.onload = () => {
			image_place.src = reader.result;
		}
		reader.readAsDataURL(file);
	}

	_dragAndDrop(dropArea, input, image_place) {
		["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
			dropArea.addEventListener(eventName, (event) => {
				event.preventDefault();
				event.stopPropagation();
			});
		});

		["dragenter", "dragover"].forEach(eventName => {
			dropArea.addEventListener(eventName, (event) => {
				dropArea.classList.add("highlight");
			});
		});

		["dragleave", "drop"].forEach(eventName => {
			dropArea.addEventListener(eventName, (event) => {
				dropArea.classList.remove("highlight");
			});
		});

		dropArea.addEventListener("drop", (event) => {
			let dt = event.dataTransfer;
			let files = dt.files;
			input.files = files;
			this._showImage(input, image_place);
		});
	}

}

customElements.define("ap-sale", SaleComp);
