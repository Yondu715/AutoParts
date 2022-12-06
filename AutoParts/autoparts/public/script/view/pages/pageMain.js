import { AnimationHandlerFactory } from "../viewTools/AnimationHandler.js";
import { RouterFactory } from "../../view/router/router.js";


let root = undefined;
let componentRoot = undefined;
let router = undefined;
let animationHandler = undefined;

function _render() {
	root.innerHTML = `<span class='overPage'></span>
					<div class='main-page'>
						<div id='wrap_content'></div>
					</div>`;
	let headerRoot = root.querySelector(".main-page");
	let menuRoot = root.querySelector("#wrap_content");
	let contentRoot = menuRoot;
	_renderHeader(headerRoot);
	_renderUserMenu(menuRoot);
	_renderContent(contentRoot);
}

function _logout() {
	let animationBlock = root.querySelector(".overPage");
	localStorage.clear();
	animationHandler.cover(animationBlock, 0.5, 0);
	setTimeout(() => router.go(), 800);
}

async function _renderHeader(headerRoot) {
	await import("../components/AppHeader/component.js")
	let header = document.createElement("app-header");
	header.setTitle("AutoParts");
	header.setUsername(localStorage.getItem("login"));
	header.setLogout(_logout);
	headerRoot.prepend(header);
}

async function _renderUserMenu(menuRoot) {
	await import("../components/AppMenu/component.js")
	let menu_funcs = [
		() => _renderComponent("ap-products"),
		() => _renderComponent("ap-sale"),
		() => _renderComponent("ap-uproducts"),
		() => _renderComponent("ap-cart"),
	];
	let menu_items = ["Запчасти", "Продать", "Мои товары", "Корзина"];
	let menu = document.createElement("app-menu");
	menu.setMenuItems(menu_items);
	menu.setMenuActions(menu_funcs);
	menuRoot.prepend(menu);
}

function _renderContent(contentRoot) {
	let content = document.createElement("div");
	content.id = "content";
	contentRoot.appendChild(content);
	componentRoot = content;
	_renderComponent("ap-products");
}

async function _renderComponent(component) {
	let component_name = component.split("-")[1];
	component_name = component_name.charAt(0).toUpperCase() + component_name.slice(1);
	await import(`../components/MainPage/${component_name}/component.js`);
	componentRoot.innerHTML = "";
	let comp = document.createElement(component);
	comp.classList.add("component");
	componentRoot.appendChild(comp);
}

export function renderPageMain(_root) {
	root = _root;
	router = RouterFactory.createInstance();
	animationHandler = AnimationHandlerFactory.createInstance();
	_render();
}