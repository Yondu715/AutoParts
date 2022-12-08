import { checkValid } from "../../../model/DataAction.js";
import { RequestManagerFactory } from "../../../model/RequestManager.js";
import { User } from "../../../model/transport/User.js";
import { RouterFactory } from "../../router/router.js";
import { template } from "./template.js";


class PageAuth extends HTMLElement {
	_root;
	_error_span;
	_router;
	_requestManager;

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
		this._router = RouterFactory.createInstance();
		this._requestManager = RequestManagerFactory.createInstance();
	}

	connectedCallback() {
		this._render();
	}

	_render() {
		this._root.appendChild(template());
		this._error_span = this._root.querySelector("#log_status");
		
		let btnReg = this._root.querySelector("#reg");
		let btnSendAuthInfo = this._root.querySelector("#btnAuthInfo");
		btnReg.addEventListener("click", () => this._router.go("reg"));
		btnSendAuthInfo.addEventListener("click", this._async_sendAuthInfo.bind(this));
	}
	
	_getAuthInfo() {
		let login = this._root.querySelector("#login").value;
		let password = this._root.querySelector("#password").value;
		let jsonAuthInfo = {
			"login": login,
			"password": password
		}
		let user = new User(jsonAuthInfo);
		return user;
	}
	
	async _async_sendAuthInfo() {
		let user = this._getAuthInfo();
		if (!checkValid(user)) {
			this._error_span.textContent = "Не все поля были заполнены";
			return;
		}
		let response = await this._requestManager.async_auth(user);
		let data = response.getBody();
		let status = response.getStatus();
		this._react_authInfo(status, data);
	}
	
	_react_authInfo(status, data) {
		switch (status) {
			case 401:
				this._error_span.textContent = "Неправильный логин или пароль";
				break;
			case 200:
				let token = data["token"];
				let body_token = token.split("\.")[1];
				let decoded_body = atob(body_token);
				let user_info = JSON.parse(decoded_body);
				let user_role = user_info["role"];
				localStorage.setItem("token", token);
				localStorage.setItem("login", user_info["login"]);
	
				switch (user_role) {
					case "client":
						this._router.go("main");
						break;
					case "admin":
						this._router.go("admin");
						break;
				}
				break;
		}
	}
}

customElements.define("ap-page-auth", PageAuth);