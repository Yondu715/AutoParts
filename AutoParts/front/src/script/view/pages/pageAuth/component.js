import { checkValid } from "../../../model/DataAction";
import { RequestManagerFactory } from "../../../model/RequestManager";
import { User } from "../../../model/transport/User";
import { RouterFactory } from "../../router/router";
import { AnimationHandlerFactory } from "../../viewUtils/AnimationHandler";
import { template } from "./template";

class PageAuth extends HTMLElement {
	_root = undefined;
	_error_span = undefined;
	_router = RouterFactory.createInstance();
	_requestManager = RequestManagerFactory.createInstance();
	_animationHandler = AnimationHandlerFactory.createInstance();
	_login = "";
	_password = "";

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
	}

	connectedCallback() {
		this._render();
	}

	setLogin(value){
		this._login = value;
	}

	setPassword(value){
		this._password = value;
	}

	setErrorSpan(value){
		this._error_span = value;
	}

	_render() {
		this._root.innerHTML = template(this);
		this._error_span = this._root.querySelector("#log_status");
		
		let login_input = this._root.querySelector("#login");
		login_input.addEventListener("change", (event) => {
			let value = event.target.value;
			this.setLogin(value);
		});
		let password_input = this._root.querySelector("#password");
		password_input.addEventListener("change", (event) => {
			let value = event.target.value;
			this.setPassword(value);
		});
		let btnReg = this._root.querySelector("#reg");
		let btnSendAuthInfo = this._root.querySelector("#btnAuthInfo");
		btnReg.addEventListener("click", () => this._router.go("reg"));
		btnSendAuthInfo.addEventListener("click", this._async_sendAuthInfo.bind(this));
		let animationBlock = this._root.querySelector(".log-content");
		this._animationHandler.fade(animationBlock, 1, 0);
	}
	
	_getAuthInfo() {
		let jsonAuthInfo = {
			"login": this._login,
			"password": this._password
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