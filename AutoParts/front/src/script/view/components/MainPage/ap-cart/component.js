import { RouterFactory } from "../../../router/router.js";
import { RequestManagerFactory } from "../../../../model/RequestManager.js";
import { jsonToObjects } from "../../../../model/DataAction.js";
import { Product } from "../../../../model/transport/Product.js";
import { template } from "./template.js";
import { AnimationHandlerFactory } from "../../../viewUtils/AnimationHandler.js";


class CartComp extends HTMLElement {
	_products = undefined;
	_router = RouterFactory.createInstance();
	_requestManager = RequestManagerFactory.createInstance();
	_root = undefined;
	_selectedProducts = [];
	_animationHandler = AnimationHandlerFactory.createInstance();

	constructor() {
		super();
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

	_getSelectedProducts(rows) {
		rows.forEach(row => row.addEventListener("click", () => {
			let cell = row.querySelector(".id");
			let product_id = Number(cell.innerText);
			if (this._selectedProducts.includes(product_id)) {
				let idx = this._selectedProducts.indexOf(product_id);
				this._selectedProducts.splice(idx, 1);
			} else {
				this._selectedProducts.push(product_id);
			}
		}));
	}

	async _async_sendDeleteInfo() {
		let jsonProductsID = [];
		this._selectedProducts.forEach(id => {
			jsonProductsID.push({ id: id });
		});
		this._selectedProducts = [];
		let response = await this._requestManager.async_deleteFromCart(jsonProductsID);
		let status = response.getStatus();
		this._react_deleteInfo(status);
	}

	_react_deleteInfo(status) {
		switch (status) {
			case 401:
				this._router.go();
				break;
			case 204:
				this._async_getCart();
				break;
		}
	}

	_render() {
		this._root.replaceChildren();
		this._root.innerHTML = template(this);
		let button = this._root.querySelector("#remove");
		button.addEventListener("click", this._async_sendDeleteInfo.bind(this));
		let table = this._root.querySelector("table");
		let rows = Array.from(table.rows);
		this._getSelectedProducts(rows);
		this._animationHandler.highlightRows(rows);
	}

}

customElements.define("ap-cart", CartComp);
