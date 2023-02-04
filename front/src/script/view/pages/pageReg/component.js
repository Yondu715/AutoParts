import { checkValid } from "../../../model/DataAction";
import { RequestManagerFactory } from "../../../model/RequestManager";
import { User } from "../../../model/transport/User";
import { RouterFactory } from "../../router/router";
import { AnimationHandlerFactory } from "../../viewUtils/AnimationHandler";
import { template } from "./template";


class PageReg extends HTMLElement {
	_root = undefined;
	_error_span = undefined;
	_router = RouterFactory.createInstance();
	_requestManager = RequestManagerFactory.createInstance();
	_animationHandler = AnimationHandlerFactory.createInstance();
	_login = "";
	_password = "";
	_repeat_pass = "";

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

	setPassword(value) {
		this._password = value;
	}

	setRepeatPass(value) {
		this._repeat_pass = value;
	}

	_render() {
		this._root.innerHTML = template();
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
		let repeat_pass_input = this._root.querySelector("#password_repeat");
		repeat_pass_input.addEventListener("change", (event) => {
			let value = event.target.value;
			this.setRepeatPass(value);
		});

		let btnAuth = this._root.querySelector("#auth");
		let btnReg = this._root.querySelector("#btnRegInfo");
		btnAuth.addEventListener("click", () => this._router.go("auth"));
		btnReg.addEventListener("click", this._async_sendRegInfo.bind(this));
		let animationBlock = this._root.querySelector(".log-content");
		this._animationHandler.fade(animationBlock, 1, 0);
	}

	_getRegInfo() {
		let jsonRegInfo = {
			"login": this._login,
			"password": this._password,
			"repeat_password": this._repeat_pass,
		}
		let user = new User(jsonRegInfo);
		return user;
	}

	async _async_sendRegInfo() {
		let user = this._getRegInfo();
		if (!checkValid(user)) {
			this._error_span.textContent = "Не все поля были заполнены";
			return;
		}

		let password = user.get()["password"];
		let repeat_password = user.get()["repeat_password"];
		if (password != repeat_password) {
			this._error_span.textContent = "Пароли не совпадают";
			return;
		}
		let response = await this._requestManager.async_reg(user);
		let status = response.getStatus();
		this._react_regInfo(status);
	}

	_react_regInfo(status) {
		switch (status) {
			case 200:
				this._router.go("auth");
				break;
			case 409:
				this._error_span.textContent = "Нельзя использовать данный логин";
				break;
		}
	}
}

customElements.define("ap-page-reg", PageReg);