import { RouterFactory } from "../../../router/router.js";
import { async_getCart } from "../../../../model/Request.js";
import { jsonToObjects } from "../../../../model/DataAction.js";
import { fade } from "../../../viewTools/AnimationHandler.js";
import { Product } from "../../../../model/transport/Product.js";
import { template } from "./template.js";


class CartComp extends HTMLElement {
	_products;
	_router;
	_root;

	constructor() {
		super();
		this._router = RouterFactory.createInstance();
		this._root = this.attachShadow({ mode: "closed" });
	}

	connectedCallback() {
		this._async_getCart();
	}

	async _async_getCart() {
		let response = await async_getCart();
		let data = response.getBody();
		let status = response.getStatus();
		this._react_getCart(status, data);
	}

	_react_getCart(status, data) {
		switch (status) {
			case 401:
				this._router.pageStart();
				break;
			case 200:
				this._products = jsonToObjects(data, Product);
				this._render();
				break;
		}
	}

	_render() {
		this._root.innerHTML = "";
		this._root.appendChild(template(this));
		let div_products = this._root.querySelector("#products");
		fade(div_products, 1.2, 0);
	}

}

customElements.define("ap-cart", CartComp);
