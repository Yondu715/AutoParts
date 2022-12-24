import { RouterFactory } from "../../../router/router";
import { RequestManagerFactory } from "../../../../model/RequestManager";
import { jsonToObjects } from "../../../../model/DataAction";
import { User } from "../../../../model/transport/User";
import { template } from "./template";
import { AnimationHandlerFactory } from "../../../viewUtils/AnimationHandler";


class ApplicationsComp extends HTMLElement {
	_root = undefined;
	_applications = undefined;
	_router = RouterFactory.createInstance();
	_requestManager = RequestManagerFactory.createInstance();;
	_selectedProducts = [];
	_animationHandler = AnimationHandlerFactory.createInstance();

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
	}

	_render() {
		this._root.replaceChildren();
		this._root.innerHTML = template(this);

		let button_accept = this._root.getElementById("accept");
		button_accept.addEventListener("click", this._async_acceptApplications.bind(this));

		let button_delete = this._root.getElementById("remove");
		button_delete.addEventListener("click", this._async_deleteApplications.bind(this));

		let table = this._root.querySelector("table");
		let rows = Array.from(table.rows);
		let selects = this._root.querySelectorAll("select");
		selects.forEach(select => {
			select.addEventListener("click", (event) => event.stopPropagation());
		});
		this._getInfo(rows);
		this._animationHandler.highlightRows(rows);
	}

	async _async_getAllApplications() {
		let response = await this._requestManager.async_getAllApplications();
		let data = response.getBody();
		let status = response.getStatus();
		this._react_getAllApplications(status, data);
	}

	_react_getAllApplications(status, data) {
		switch (status) {
			case 401:
				this._router.go();
				break;
			case 200:
				this._applications = jsonToObjects(data, User);
				this._render();
				break;
		}
	}

	_getAcceptInfo() {
		let rows = this._root.querySelectorAll("tr");
		let jsonApplications = [];
		rows.forEach(row => {
			let cell = row.querySelector(".id");
			let product_id = Number(cell.innerText);
			if (this._selectedProducts.includes(product_id)){
				let cell_role = row.querySelector(".roles");
				let application = {
					id: product_id,
					role: cell_role.value,
				}
				jsonApplications.push(application);
			}
		});
		this._selectedProducts = [];
		return jsonApplications;
	}

	async _async_acceptApplications() {
		let jsonApplications = this._getAcceptInfo();
		let response = await this._requestManager.async_acceptApplications(jsonApplications);
		let status = response.getStatus();
		this._react_requestInfo(status);
	}

	_getInfo(rows) {
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

	async _async_deleteApplications() {
		let jsonProductsID = [];
		this._selectedProducts.forEach(id => {
			jsonProductsID.push({ id: id });
		});
		this._selectedProducts = [];
		let response = await this._requestManager.async_deleteApplications(jsonProductsID);
		let status = response.getStatus();
		this._react_requestInfo(status);
	}

	_react_requestInfo(status) {
		switch (status) {
			case 401:
				this._router.go();
				break;
			case 204:
			case 202:
				this._async_getAllApplications();
				break;
		}
	}

	connectedCallback() {
		this._async_getAllApplications();
	}

}

customElements.define("ap-applications", ApplicationsComp);
