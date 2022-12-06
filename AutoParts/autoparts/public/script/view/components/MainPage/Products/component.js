import { RouterFactory } from "../../../router/router.js";
import { async_getAllProducts } from "../../../../model/Request.js";
import { jsonToObjects } from "../../../../model/DataAction.js";
import { fade } from "../../../viewTools/AnimationHandler.js";
import { Product } from "../../../../model/transport/Product.js";
import { template } from "./template.js";


class ProductsComp extends HTMLElement {
	_products;
	_router;
	_root;

	constructor() {
		super();
		this._router = RouterFactory.createInstance();
		this._root = this.attachShadow({ mode: "closed" });
	}

	connectedCallback() {
		this._async_getAllProducts();
	}

	async _async_getAllProducts() {
		let response = await async_getAllProducts();
		let data = response.getBody();
		let status = response.getStatus();
		this._react_getAllProducts(status, data);
	}

	_react_getAllProducts(status, data) {
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
		let table = this._root.querySelector("table");
		fade(div_products, 1.2, 0);

		table.addEventListener("click", (event) => {
			let row = event.target.closest("tr");
			let span = row.querySelector(".id");
			let id = span.textContent;
			this._renderProductInfo(id);
		});
	}

	async _renderProductInfo(id) {
		await import("../Iproduct/component.js");
		let comp = document.createElement("ap-iproduct");
		comp.setProductId(id);
		this._root.innerHTML = "";
		this._root.appendChild(comp);
	}
}

customElements.define("ap-products", ProductsComp);
