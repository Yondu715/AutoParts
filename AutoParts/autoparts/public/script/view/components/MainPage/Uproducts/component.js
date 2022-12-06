import { fade, highlightRow } from "../../../viewTools/AnimationHandler.js";
import { RouterFactory } from "../../../router/router.js";
import { jsonToObjects } from "../../../../model/DataAction.js";
import { async_deleteProducts, async_getUserProducts } from "../../../../model/Request.js";
import { Product } from "../../../../model/transport/Product.js";
import { template } from "./template.js";

class UserProductsComp extends HTMLElement {
	_products;
	_router;
	_root;

	constructor() {
		super();
		this._router = RouterFactory.createInstance();
		this._root = this.attachShadow({ mode: "closed" });
	}

	connectedCallback() {
		this._async_getUserProducts();
	}

	async _async_getUserProducts() {
		let response = await async_getUserProducts();
		let data = response.getBody();
		let status = response.getStatus();
		this._react_getUserProducts(status, data);
	}

	_react_getUserProducts(status, data) {
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
		let rows = this._root.querySelectorAll("tr");
		let button = this._root.querySelector("#remove");
		button.addEventListener("click", this._async_sendDeleteInfo.bind(this));
		fade(div_products, 1.2, 0);
		highlightRow(rows);
	}

	/* DELETE PRODUCT */

	_getDeleteInfo() {
		let rows = this._root.querySelectorAll("tr");
		let products_id = [];
		for (let i = 0; i < rows.length; i++) {
			if (rows[i].style.background != "") {
				let cell = rows[i].querySelector(".id");
				let product = {
					id: Number(cell.innerText)
				}
				products_id.push(product);
			}
		}
		return products_id;
	}

	async _async_sendDeleteInfo() {
		let jsonProductsID = this._getDeleteInfo();
		let response = await async_deleteProducts(jsonProductsID);
		let status = response.getStatus();
		this._react_deleteInfo(status);
	}

	_react_deleteInfo(status) {
		switch (status) {
			case 401:
				this._router.pageStart();
				break;
			case 204:
				this._async_getUserProducts();
				break;
		}
	}
}

customElements.define("ap-uproducts", UserProductsComp);

