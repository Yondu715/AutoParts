import { RouterFactory } from "../../../router/router.js";
import { RequestManagerFactory } from "../../../../model/Request.js";
import { jsonToObjects } from "../../../../model/DataAction.js";
import { User } from "../../../../model/transport/User.js";
import { template } from "./template.js";


class ApplicationsComp extends HTMLElement {
	_applications;
	_router;
	_requestManager;
	_root;

	constructor() {
		super();
		this._router = RouterFactory.createInstance();
		this._requestManager = RequestManagerFactory.createInstance();
		this._root = this.attachShadow({ mode: "closed" });
	}

	_render() {
		this._root.replaceChildren();
		this._root.appendChild(template(this));

		let button_accept = this._root.getElementById("accept");
		button_accept.addEventListener("click", this._async_acceptApplications.bind(this));

		let button_delete = this._root.getElementById("remove");
		button_delete.addEventListener("click", this._async_deleteApplications.bind(this));

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

	_getHighlightRows() {
		let rows = this._root.querySelectorAll("tr");
		let applications_rows = [];
		rows.forEach(row => {
			if (row.style.background != "") {
				applications_rows.push(row);
			}
		});
		return applications_rows;
	}

	_getAcceptInfo() {
		let rows = this._getHighlightRows();
		let jsonApplications = [];
		rows.forEach(row => {
			let cell_id = row.querySelector(".id");
			let cell_login = row.querySelector(".login");
			let cell_password = row.querySelector(".password");
			let cell_role = row.querySelector(".roles");
			let application = {
				id: Number(cell_id.innerText),
				login: cell_login.innerText,
				password: cell_password.innerText,
				role: cell_role.value,
			}
			jsonApplications.push(application);
		});
		return jsonApplications;
	}

	async _async_acceptApplications() {
		let jsonApplications = this._getAcceptInfo();
		let response = await this._requestManager.async_acceptApplications(jsonApplications);
		let status = response.getStatus();
		this._react_requestInfo(status);
	}

	_getDeleteInfo() {
		let rows = this._getHighlightRows();
		let jsonApplications_id = [];
		rows.forEach(row => {
			let cell = row.querySelector(".id");
			let application = {
				id: Number(cell.innerText),
			}
			jsonApplications_id.push(application);
		});
		return jsonApplications_id;
	}

	async _async_deleteApplications() {
		let jsonApplications_id = this._getDeleteInfo();
		let response = await this._requestManager.async_deleteApplications(jsonApplications_id);
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
