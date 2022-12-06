import { RouterFactory } from "../../../router/router.js";
import { Product } from "../../../../model/transport/Product.js";
import { RequestManagerFactory } from "../../../../model/Request.js";
import { checkValid } from "../../../../model/DataAction.js";
import { images } from "../../../viewTools/images.js";
import { template } from "./template.js";


class SaleComp extends HTMLElement {
	_error_span;
	_router;
	_requestManager;
	_root;

	constructor() {
		super();
		this._router = RouterFactory.createInstance();
		this._requestManager = RequestManagerFactory.createInstance();
		this._root = this.attachShadow({ mode: "closed" });
	}

	connectedCallback() {
		this._render();
	}

	_render() {
		this._root.innerHTML = "";
		this._root.appendChild(template(this));
		this._error_span = this._root.querySelector("#sale_status");
		let button = this._root.querySelector("#accept");
		button.addEventListener("click", this._async_sendSaleInfo.bind(this));
	}

	_getSaleInfo() {
		let input_image = this._root.querySelector("#input_image");
		let image = this._root.querySelector("#image");
		let jsonSale = {};
		let fields = ["name", "brand", "model", "price"];
		for (let i = 0; i < fields.length; i++) {
			let value = this._root.querySelector(`#${fields[i]}`).value;
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

}

customElements.define("ap-sale", SaleComp);
