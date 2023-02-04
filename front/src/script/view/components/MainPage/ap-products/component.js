import { RouterFactory } from "../../../router/router";
import { RequestManagerFactory } from "../../../../model/RequestManager";
import { jsonToObjects } from "../../../../model/DataAction";
import { Product } from "../../../../model/transport/Product";
import { template } from "./template";
import { IdProductFactory } from "../../../../model/domain/productId";


class ProductsComp extends HTMLElement {
	_products = undefined;
	_router = RouterFactory.createInstance();
	_requestManager = RequestManagerFactory.createInstance();
	_root = undefined;

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
	}

	connectedCallback() {
		this._async_getAllProducts();
	}

	async _async_getAllProducts() {
		let response = await this._requestManager.async_getAllProducts();
		let data = response.getBody();
		let status = response.getStatus();
		this._react_getAllProducts(status, data);
	}

	_react_getAllProducts(status, data) {
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
		let table = this._root.querySelector("table");

		table.addEventListener("click", async (event) => {
			let row = event.target.closest("tr");
			let span = row.querySelector(".id");
			let id = span.textContent;
			this._renderProductInfo(id);
		});
	}

	async _renderProductInfo(id) {
		await import("../ap-iproduct/component.js");
		let IdProduct = IdProductFactory.createInstance();
		let comp = document.createElement("ap-iproduct");
		IdProduct.setValue(id);
		this._root.replaceChildren();
		this._root.appendChild(comp);
	}
}

customElements.define("ap-products", ProductsComp);
