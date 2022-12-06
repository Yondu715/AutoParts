import { RouterFactory } from "../../../router/router.js";
import { async_acceptApplications, async_deleteApplications, async_getAllApplications } from "../../../../model/Request.js";
import { jsonToObjects } from "../../../../model/DataAction.js";
import { fade, highlightRow } from "../../../viewTools/AnimationHandler.js";
import { User } from "../../../../model/transport/User.js";
import { template } from "./template.js";


class ApplicationsComp extends HTMLElement {
	_applications;
	_router;
	_root;

	constructor() {
		super();
		this._router = RouterFactory.createInstance();
		this._root = this.attachShadow({ mode: "closed" });
	}

	_render() {
		this._root.innerHTML = "";
		this._root.appendChild(template(this));
		let div_applications = this._root.getElementById("applications");
		let rows = this._root.querySelectorAll("tr");

		let button_accept = this._root.getElementById("accept");
		button_accept.addEventListener("click", this._async_acceptApplications.bind(this));

		let button_delete = this._root.getElementById("remove");
		button_delete.addEventListener("click", this._async_deleteApplications.bind(this));

		highlightRow(rows);
		fade(div_applications, 1.2, 0);
	}

	async _async_getAllApplications() {
		let response = await async_getAllApplications();
		let data = response.getBody();
		let status = response.getStatus();
		this._react_getAllApplications(status, data);
	}

	_react_getAllApplications(status, data) {
		switch (status) {
			case 401:
				this._router.pageStart();
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
		for (let i = 0; i < rows.length; i++) {
			if (rows[i].style.background != "") {
				applications_rows.push(rows[i]);
			}
		}
		return applications_rows;
	}

	_getAcceptInfo() {
		let rows = this._getHighlightRows();
		let jsonApplications = [];
		for (let i = 0; i < rows.length; i++) {
			let cell_id = rows[i].querySelector(".id");
			let cell_login = rows[i].querySelector(".login");
			let cell_password = rows[i].querySelector(".password");
			let cell_role = rows[i].querySelector(".roles");
			let application = {
				id: Number(cell_id.innerText),
				login: cell_login.innerText,
				password: cell_password.innerText,
				role: cell_role.value,
			}
			jsonApplications.push(application);
		}
		return jsonApplications;
	}

	async _async_acceptApplications() {
		let jsonApplications = this._getAcceptInfo();
		let response = await async_acceptApplications(jsonApplications);
		let status = response.getStatus();
		this._react_requestInfo(status);
	}

	_getDeleteInfo() {
		let rows = this._getHighlightRows();
		let jsonApplications_id = [];
		for (let i = 0; i < rows.length; i++) {
			let cell = rows[i].querySelector(".id");
			let application = {
				id: Number(cell.innerText),
			}
			jsonApplications_id.push(application);
		}
		return jsonApplications_id;
	}

	async _async_deleteApplications() {
		let jsonApplications_id = this._getDeleteInfo();
		let response = await async_deleteApplications(jsonApplications_id);
		let status = response.getStatus();
		this._react_requestInfo(status);
	}

	_react_requestInfo(status) {
		switch (status) {
			case 401:
				this._router.pageStart();
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
