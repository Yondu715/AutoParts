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

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
	}

	connectedCallback() {
		this._render();
	}

	_render() {
		this._root.innerHTML = template();
		this._error_span = this._root.querySelector("#log-status");
		let btnAuth = this._root.querySelector("#auth");
		let btnReg = this._root.querySelector("#btnRegInfo");
		btnAuth.addEventListener("click", () => this._router.go("auth"));
		btnReg.addEventListener("click", this._async_sendRegInfo.bind(this));
		let animationBlock = this._root.querySelector(".log-content");
		this._animationHandler.fade(animationBlock, 1, 0);
	}

	_getRegInfo() {
		let login = this._root.querySelector("#login").value
		let password = this._root.querySelector("#password").value
		let repeat_password = this._root.querySelector("#password_repeat").value
		let jsonRegInfo = {
			"login": login,
			"password": password,
			"repeat-password": repeat_password,
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
		let repeat_password = user.get()["repeat-password"];
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