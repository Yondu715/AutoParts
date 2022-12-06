import { RouterFactory } from "../../view/router/router.js";
import { cover } from "../viewTools/AnimationHandler.js";

let root = undefined;
let componentRoot = undefined;
let router = undefined;

function _render() {
	root.innerHTML = `
					<span class='overPage'></span>
					<div class='main-page'>
						<div id='wrap_content'></div>
					</div>`;
	let headerRoot = root.querySelector(".main-page");
	let menuRoot = root.querySelector("#wrap_content");
	let contentRoot = menuRoot;
	_renderHeader(headerRoot);
	_renderAdminMenu(menuRoot);
	_renderContent(contentRoot);
}

async function _renderHeader(headerRoot) {
	await import("../components/AppHeader/component.js")
	let header = document.createElement("app-header");
	header.setTitle("AutoParts");
	header.setUsername(localStorage.getItem("login"));
	header.setLogout(_logout);
	headerRoot.prepend(header);
}

async function _renderAdminMenu(menuRoot) {
	await import("../components/AppMenu/component.js")
	let menu_items = ["Заявки", "Пользователи"];
	let menu_funcs = [
		() => _renderComponent("ap-applications"),
		() => _renderComponent("ap-users"),
	];
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
	_renderComponent("ap-applications");
}

async function _renderComponent(component) {
	let component_name = component.split("-")[1];
	component_name = component_name.charAt(0).toUpperCase() + component_name.slice(1);
	await import(`../components/AdminPage/${component_name}/component.js`);
	componentRoot.innerHTML = "";
	let comp = document.createElement(component);
	comp.classList.add("component");
	componentRoot.appendChild(comp);
}

function _logout() {
	let animationBlock = root.querySelector(".overPage");
	localStorage.clear();
	cover(animationBlock, 0.5, 0);
	setTimeout(router.pageStart, 800);
}

export function renderPageAdmin(_root) {
	root = _root;
	router = RouterFactory.createInstance();
	_render();
}