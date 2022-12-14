import { RouterFactory } from "../../../router/router";
import { jsonToObjects } from "../../../../model/DataAction";
import { RequestManagerFactory } from "../../../../model/RequestManager";
import { Product } from "../../../../model/transport/Product";
import { template } from "./template";
import { AnimationHandlerFactory } from "../../../viewUtils/AnimationHandler";

class UserProductsComp extends HTMLElement {
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
		this._async_getUserProducts();
	}

	async _async_getUserProducts() {
		let response = await this._requestManager.async_getUserProducts();
		let data = response.getBody();
		let status = response.getStatus();
		this._react_getUserProducts(status, data);
	}

	_react_getUserProducts(status, data) {
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
		this._root.innerHTML = template(this);
		let button = this._root.querySelector("#remove");
		button.addEventListener("click", this._async_sendDeleteInfo.bind(this));
		let table = this._root.querySelector("table");
		let rows = Array.from(table.rows);
		this._getSelectedProducts(rows);
		this._animationHandler.highlightRows(rows);
	}

	/* DELETE PRODUCT */

	_getSelectedProducts(rows) {
		rows.forEach(row => row.addEventListener("click", () => {
			let cell = row.querySelector(".id");
			let product_id = Number(cell.innerText);
			if (this._selectedProducts.includes(product_id)){
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
			jsonProductsID.push({id: id});
		});
		this._selectedProducts = [];
		let response = await this._requestManager.async_deleteProducts(jsonProductsID);
		let status = response.getStatus();
		this._react_deleteInfo(status);
	}

	_react_deleteInfo(status) {
		switch (status) {
			case 401:
				this._router.go();
				break;
			case 204:
				this._async_getUserProducts();
				break;
		}
	}
}

customElements.define("ap-uproducts", UserProductsComp);

