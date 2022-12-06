import { RouterFactory } from "../../../router/router.js";
import { jsonToObjects } from "../../../../model/DataAction.js";
import { fade, highlightRow } from "../../../viewTools/AnimationHandler.js";
import { User } from "../../../../model/transport/User.js";
import { async_deleteUsers, async_getAllUsers } from "../../../../model/Request.js";
import { template } from "./template.js"

class UsersComp extends HTMLElement {

	constructor() {
		super();
		this._users = undefined;
		this._router = RouterFactory.createInstance();
		this._root = this.attachShadow({ mode: "closed" });
	}

	async _async_getUsers() {
		let response = await async_getAllUsers();
		let data = response.getBody();
		let status = response.getStatus();
		this._react_getUsers(status, data);
	}

	_react_getUsers(status, data) {
		switch (status) {
			case 401:
				this._router.pageStart();
				break;
			case 200:
				this._users = jsonToObjects(data, User);
				this._render();
				break;
		}
	}

	_render() {
		this._root.innerHTML = "";
		this._root.appendChild(template(this));
		let div_users = this._root.getElementById("users");
		let rows = this._root.querySelectorAll("tr");

		let button_delete = this._root.getElementById("remove");
		button_delete.addEventListener("click", this._async_sendDeleteInfo.bind(this));

		fade(div_users, 1.2, 0);
		highlightRow(rows);
	}

	_getDeleteInfo() {
		let rows = this._root.querySelectorAll("tr");
		let users_id = [];
		for (let i = 0; i < rows.length; i++) {
			if (rows[i].style.background != "") {
				let cell = rows[i].querySelector(".id");
				let user = {
					id: Number(cell.innerText)
				}
				users_id.push(user);
			}
		}
		return users_id;
	}

	async _async_sendDeleteInfo() {
		let jsonUsersID = this._getDeleteInfo();
		let response = await async_deleteUsers(jsonUsersID);
		let status = response.getStatus();
		this._react_deleteInfo(status);
	}

	_react_deleteInfo(status) {
		switch (status) {
			case 401:
				this._router.pageStart();
				break;
			case 204:
				this._async_getUsers();
				break;
		}
	}

	connectedCallback() {
		this._async_getUsers();
	}
}

customElements.define("ap-users", UsersComp);
