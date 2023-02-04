import { RouterFactory } from "../../router/router";
import { AnimationHandlerFactory } from "../../viewUtils/AnimationHandler";
import { template } from "./template";
import "../../components/Common/ap-header/component";
import "../../components/Common/ap-menu/component";
import "../../components/MainPage/ap-products/component";


class PageMain extends HTMLElement {
	_root = undefined;
	_error_span = undefined;
	_router = RouterFactory.createInstance();
	_animationHandler = AnimationHandlerFactory.createInstance();
	_componentRoot = undefined;

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
	}

	connectedCallback() {
		this._render();
	}

	_render() {
		this._root.innerHTML = template();
		this._componentRoot = this._root.querySelector("#content");
		this._renderHeader();
		this._renderUserMenu();
	}

	_logout() {
		let animationBlock = this._root.querySelector(".overPage");
		localStorage.clear();
		this._animationHandler.cover(animationBlock, 0.5, 0);
		setTimeout(() => this._router.go(), 800);
	}

	async _renderHeader() {
		let header = this._root.querySelector("ap-header");
		header.setTitle("AutoParts");
		header.setUsername(localStorage.getItem("login"));
		header.setLogout(this._logout.bind(this));
	}

	async _renderUserMenu() {
		let menu_funcs = [
			() => this._renderComponent("ap-products"),
			() => this._renderComponent("ap-sale"),
			() => this._renderComponent("ap-uproducts"),
			() => this._renderComponent("ap-cart"),
		];
		let menu_items = ["Запчасти", "Продать", "Мои товары", "Корзина"];
		let menu = this._root.querySelector("ap-menu");
		menu.setMenuItems(menu_items);
		menu.setMenuActions(menu_funcs);
	}

	async _renderComponent(component) {
		await import(`../../components/MainPage/${component}/component`);
		this._componentRoot.replaceChildren();
		let comp = document.createElement(component);
		comp.classList.add("component");
		this._componentRoot.appendChild(comp);
	}

}

customElements.define("ap-page-main", PageMain);