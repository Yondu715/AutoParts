import { cover, highlightMenu } from "../../AnimationHandler.js";
import { Router } from "../../router.js";
import { images } from "../../images.js";
import renderApplications from "./components/applications.js"
import renderUsers from "./components/users.js";



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
	_renderMenu();
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

function _renderMenu() {
	let menu_root = document.getElementById("wrap-content");
	let menu = document.createElement("div");
	menu.classList.add("menu");
	let menu_items = ["Заявки", "Пользователи"];
	let list = document.createElement("ul");
	for (let i = 0; i < menu_items.length; i++) {
		let row = document.createElement("li");
		let btn = document.createElement("button");
		btn.textContent = menu_items[i];
		row.appendChild(btn);
		list.appendChild(row);
	}
	menu.appendChild(list);
	menu_root.appendChild(menu);

	let buttons = list.getElementsByTagName("button");
	let menu_funcs = [
		() => renderApplications(root, componentRoot),
		() => renderUsers(root, componentRoot),
	];
	for (let i = 0; i < menu_funcs.length; i++) {
		buttons[i].addEventListener("click", menu_funcs[i]);
	}
	highlightMenu(buttons);
}

function _renderContent() {
	let content_root = document.getElementById("wrap-content");
	let content = document.createElement("div");
	content.id = "content";
	content_root.appendChild(content);
	renderApplications(root, content);
}

export default function init(_root) {
	root = _root;
	router = new Router();
	_render();
}