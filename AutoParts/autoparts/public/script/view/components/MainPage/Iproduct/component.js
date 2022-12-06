import { RouterFactory } from "../../../router/router.js";
import { async_getProductInfo } from "../../../../model/Request.js";
import { jsonToObjects } from "../../../../model/DataAction.js";
import { fade } from "../../../viewTools/AnimationHandler.js";
import { Product } from "../../../../model/transport/Product.js";
import { template } from "./template.js";


class InfoProductComp extends HTMLElement {
	_product;
	_product_id;
	_router;
	_root;

	constructor() {
		super();
		this._router = RouterFactory.createInstance();
		this._root = this.attachShadow({ mode: "closed" });
	}

	connectedCallback() {
		this._async_getProductInfo();
	}

	setProductId(value) {
		this._product_id = value;
	}

	async _async_getProductInfo() {
		let response = await async_getProductInfo(this._product_id);
		let data = response.getBody();
		let status = response.getStatus();
		this._react_getProductInfo(status, data);
	}

	_react_getProductInfo(status, data) {
		switch (status) {
			case 401:
				this._router.pageStart();
				break;
			case 200:
				this._product = jsonToObjects(data, Product);
				this._render();
				break;
		}
	}

	_render() {
		this._root.innerHTML = "";
		this._root.appendChild(template(this));
		let div_productInfo = this._root.querySelector("#product_info");
		let image = this._root.querySelector(".image");
		let button = this._root.querySelector("button");
		image.src = this._product.get()["image"];
		fade(div_productInfo, 0.8, 0);

		if (button) {
			button.addEventListener("click", this._async_addToCart.bind(this))
		}
	}

	async _async_addToCart() {
		let response = await async_addToCart(this._product);
		let status = response.getStatus();
		_react_addCart(status);
	}

	_react_addCart(status) {
		switch (status) {
			case 401:
				this._router.pageStart();
				break;
		}
	}

}

customElements.define("ap-iproduct", InfoProductComp);
