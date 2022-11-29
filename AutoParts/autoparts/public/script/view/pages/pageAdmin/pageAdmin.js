import { cover, highlightMenu } from "../../viewTools/AnimationHandler.js";
import { Router } from "../../router.js";
import { images } from "../../viewTools/images.js";
import { renderApplications } from "./components/applications.js"
import { renderUsers } from "./components/users.js";
import { createMenu } from "../../components/menu.js";


let root = undefined;
let componentRoot = undefined;
let router = undefined;

function _render() {
	root.innerHTML = `<span class='overPage'></span>
					<div class='main-page'>
						<header>
							<div class='start'>
								<span>AutoParts</span>
							</div>
							<div class='end'>
								<span class='user-login'>Yondu</span>
								<button id='btn-logout' class='btn-logout'></button>
							</div>
						</header>
						<div id='wrap-content'></div>
					</div>`
	_renderAdminMenu();
	_renderContent();
	componentRoot = document.getElementById("content");
	let userLogin = document.querySelector(".user-login");
	let btnLogout = document.getElementById("btn-logout");
	btnLogout.style.backgroundImage = "url(" + images["logout"] + ")";
	userLogin.textContent = localStorage.getItem("login");
	btnLogout.addEventListener("click", _logout);
}

function _logout() {
	let animationBlock = document.querySelector(".overPage");
	localStorage.clear();
	cover(animationBlock, 0.5, 0);
	setTimeout(() => {
		router.pageStart(root);
	}, 800);
}

/* RENDER MENU */

function _renderAdminMenu() {
	let menu_items = ["Заявки", "Пользователи"];
	let menu_funcs = [
		() => renderApplications(root, componentRoot),
		() => renderUsers(root, componentRoot),
	];
	let menu_object = createMenu(menu_items, menu_funcs);
	let menu = menu_object.menu;
	let buttons = menu_object.buttons;
	menu.classList.add("menu");
	highlightMenu(buttons);
	let menu_root = document.getElementById("wrap-content");
	menu_root.appendChild(menu);
}

function _renderContent() {
	let content_root = document.getElementById("wrap-content");
	let content = document.createElement("div");
	content.id = "content";
	content_root.appendChild(content);
	renderApplications(root, content);
}

export function renderPageAdmin(_root) {
	root = _root;
	router = new Router();
	_render();
}