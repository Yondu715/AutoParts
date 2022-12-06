import { RequestManagerFactory } from "../../../model/Request.js";
import { RouterFactory } from "../../router/router.js";
import { AnimationHandlerFactory } from "../../viewTools/AnimationHandler.js";
import { template } from "./template.js";


class PageAdmin extends HTMLElement {
	_root;
	_error_span;
	_router;
	_requestManager;
	_animationHandler;
	_componentRoot;

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
		this._router = RouterFactory.createInstance();
		this._requestManager = RequestManagerFactory.createInstance();
		this._animationHandler = AnimationHandlerFactory.createInstance();
	}

	connectedCallback() {
		this._render();
	}


	_render() {
		this._root.appendChild(template());
		let headerRoot = this._root.querySelector(".main-page");
		let menuRoot = this._root.querySelector("#wrap_content");
		let contentRoot = menuRoot;
		this._renderHeader(headerRoot);
		this._renderAdminMenu(menuRoot);
		this._renderContent(contentRoot);
	}

	async _renderHeader(headerRoot) {
		await import("../../components/AppHeader/component.js")
		let header = document.createElement("app-header");
		header.setTitle("AutoParts");
		header.setUsername(localStorage.getItem("login"));
		header.setLogout(this._logout.bind(this));
		headerRoot.prepend(header);
	}

	async _renderAdminMenu(menuRoot) {
		await import("../../components/AppMenu/component.js")
		let menu_items = ["Заявки", "Пользователи"];
		let menu_funcs = [
			() => this._renderComponent("ap-applications"),
			() => this._renderComponent("ap-users"),
		];
		let menu = document.createElement("app-menu");
		menu.setMenuItems(menu_items);
		menu.setMenuActions(menu_funcs);
		menuRoot.prepend(menu);
	}

	_renderContent(contentRoot) {
		let content = document.createElement("div");
		content.id = "content";
		contentRoot.appendChild(content);
		this._componentRoot = content;
		this._renderComponent("ap-applications");
	}

	async _renderComponent(component) {
		let component_name = component.split("-")[1];
		component_name = component_name.charAt(0).toUpperCase() + component_name.slice(1);
		await import(`../../components/AdminPage/${component_name}/component.js`);
		this._componentRoot.replaceChildren();
		let comp = document.createElement(component);
		comp.classList.add("component");
		this._componentRoot.appendChild(comp);
	}

	_logout() {
		let animationBlock = this._root.querySelector(".overPage");
		localStorage.clear();
		this._animationHandler.cover(animationBlock, 0.5, 0);
		setTimeout(() => this._router.go(), 800);
	}

}

customElements.define("ap-page-admin", PageAdmin);