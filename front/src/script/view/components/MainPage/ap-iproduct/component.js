import { RouterFactory } from "../../../router/router";
import { RequestManagerFactory } from "../../../../model/RequestManager";
import { jsonToObjects } from "../../../../model/DataAction";
import { Product } from "../../../../model/transport/Product";
import { template } from "./template";
import { IdProductFactory } from "../../../../model/domain/productId";


class InfoProductComp extends HTMLElement {
	_product = undefined;
	_product_id = undefined;
	_router = RouterFactory.createInstance();
	_requestManager = RequestManagerFactory.createInstance();
	_idProduct = IdProductFactory.createInstance();
	_root = undefined;

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
		this._idProduct.subscribe(this._setProductId.bind(this));
	}

	connectedCallback() {
		this._async_getProductInfo();
	}

	_setProductId(value) {
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
		this._root.innerHTML = template(this);
		
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
