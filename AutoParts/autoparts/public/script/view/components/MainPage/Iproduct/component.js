import { RouterFactory } from "../../../router/router.js";
import { RequestManagerFactory } from "../../../../model/Request.js";
import { jsonToObjects } from "../../../../model/DataAction.js";
import { Product } from "../../../../model/transport/Product.js";
import { template } from "./template.js";


class InfoProductComp extends HTMLElement {
	_product;
	_product_id;
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
		this._async_getProductInfo();
	}

	setProductId(value) {
		this._product_id = value;
	}

	async _async_getProductInfo() {
		let response = await this._requestManager.async_getProductInfo(this._product_id);
		let data = response.getBody();
		let status = response.getStatus();
		this._react_getProductInfo(status, data);
	}

	_react_getProductInfo(status, data) {
		switch (status) {
			case 401:
				this._router.go();
				break;
			case 200:
				this._product = jsonToObjects(data, Product);
				this._render();
				break;
		}
	}

	_render() {
		this._root.replaceChildren();
		this._root.appendChild(template(this));
		
		let button = this._root.querySelector("button");
		if (button) {
			button.addEventListener("click", this._async_addToCart.bind(this))
		}
	}

	async _async_addToCart() {
		let response = await this._requestManager.async_addToCart(this._product);
		let status = response.getStatus();
		this._react_addCart(status);
	}

	_react_addCart(status) {
		switch (status) {
			case 401:
				this._router.go();
				break;
		}
	}

}

customElements.define("ap-iproduct", InfoProductComp);
