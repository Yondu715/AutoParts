import { RouterFactory } from "../../../router/router";
import { jsonToObjects } from "../../../../model/DataAction";
import { User } from "../../../../model/transport/User";
import { template } from "./template"
import { RequestManagerFactory } from "../../../../model/RequestManager";
import { AnimationHandlerFactory } from "../../../viewUtils/AnimationHandler";

class UsersComp extends HTMLElement {
	_users = undefined;
	_root = undefined;
	_router = RouterFactory.createInstance();
	_requestManager = RequestManagerFactory.createInstance();
	_selectedUsers = [];
	_animationHandler = AnimationHandlerFactory.createInstance();

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
	}

	async _async_getUsers() {
		let response = await this._requestManager.async_getAllUsers();
		let data = response.getBody();
		let status = response.getStatus();
		this._react_getUsers(status, data);
	}

	_react_getUsers(status, data) {
		switch (status) {
			case 401:
				this._router.go();
				break;
			case 200:
				this._users = jsonToObjects(data, User);
				this._render();
				break;
		}
	}

	_render() {
		this._root.replaceChildren();
		this._root.innerHTML = template(this);

		let button_delete = this._root.getElementById("remove");
		button_delete.addEventListener("click", this._async_sendDeleteInfo.bind(this));
		
		let table = this._root.querySelector("table");
		let rows = Array.from(table.rows);
		this._getSelectedUsers(rows);
		this._animationHandler.highlightRows(rows);
	}

	_getSelectedUsers(rows) {
		rows.forEach(row => row.addEventListener("click", () => {
			let cell = row.querySelector(".id");
			let user_id = Number(cell.innerText);
			if (this._selectedUsers.includes(user_id)) {
				let idx = this._selectedUsers.indexOf(user_id);
				this._selectedUsers.splice(idx, 1);
			} else {
				this._selectedUsers.push(user_id);
			}
		}));
	}


	async _async_sendDeleteInfo() {
		let jsonUsersID = [];
		this._selectedUsers.forEach(id => {
			jsonUsersID.push({ id: id });
		});
		this._selectedUsers = [];
		let response = await this._requestManager.async_deleteUsers(jsonUsersID);
		let status = response.getStatus();
		this._react_deleteInfo(status);
	}

	_react_deleteInfo(status) {
		switch (status) {
			case 401:
				this._router.go();
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
