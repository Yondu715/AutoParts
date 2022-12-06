import { RouterFactory } from "../../../router/router.js";
import { RequestManagerFactory } from "../../../../model/Request.js";
import { jsonToObjects } from "../../../../model/DataAction.js";
import { Product } from "../../../../model/transport/Product.js";
import { template } from "./template.js";


class CartComp extends HTMLElement {
	_products;
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
		this._async_getCart();
	}

	async _async_getCart() {
		let response = await this._requestManager.async_getCart();
		let data = response.getBody();
		let status = response.getStatus();
		this._react_getCart(status, data);
	}

	_react_getCart(status, data) {
		switch (status) {
			case 401:
				this._router.go();
				break;
			case 200:
				this._products = jsonToObjects(data, Product);
				this._render();
				break;
		}
	}

	_render() {
		this._root.replaceChildren();
		this._root.appendChild(template(this));
	}

}

customElements.define("ap-cart", CartComp);
