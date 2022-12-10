import { RouterFactory } from "../../router/router.js";
import { AnimationHandlerFactory } from "../../viewUtils/AnimationHandler.js";
import { template } from "./template.js";


class PageAdmin extends HTMLElement {
	_root;
	_error_span;
	_router;
	_animationHandler;
	_componentRoot;

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
		this._router = RouterFactory.createInstance();
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
		await import("../../components/Common/ap-header/component.js")
		let header = document.createElement("ap-header");
		header.setTitle("AutoParts");
		header.setUsername(localStorage.getItem("login"));
		header.setLogout(this._logout.bind(this));
		headerRoot.prepend(header);
	}

	async _renderAdminMenu(menuRoot) {
		await import("../../components/Common/ap-menu/component.js")
		let menu_items = ["Заявки", "Пользователи"];
		let menu_funcs = [
			() => this._renderComponent("ap-applications"),
			() => this._renderComponent("ap-users"),
		];
		let menu = document.createElement("ap-menu");
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
		await import(`../../components/AdminPage/${component}/component.js`);
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