import { cover, highlightMenu } from "../../viewTools/AnimationHandler.js";
import { Router } from "../../router.js";
import { images } from "../../viewTools/images.js";
import { renderSale } from "./components/sale.js";
import { renderUserProducts } from "./components/userProducts.js";
import { renderProducts } from "./components/products.js";
import { renderCart } from "./components/cart.js";
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
					</div>`;
	let menuRoot = document.getElementById("wrap-content");
	let contentRoot = menuRoot;
	_renderUserMenu(menuRoot);
	_renderContent(contentRoot);
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
	setTimeout(router.pageStart, 800);
}

function _renderUserMenu(menuRoot) {
	let menu_funcs = [
		() => renderProducts(componentRoot),
		() => renderSale( componentRoot),
		() => renderUserProducts(componentRoot),
		() => renderCart(componentRoot),
	];
	let menu_items = ["Запчасти", "Продать", "Мои товары", "Корзина"];
	let menu_object = createMenu(menu_items, menu_funcs);
	let menu = menu_object.menu;
	let menu_buttons = menu_object.buttons;
	menu.classList.add("menu");
	highlightMenu(menu_buttons);
	menuRoot.appendChild(menu);
}

function _renderContent(contentRoot) {
	let content = document.createElement("div");
	content.id = "content";
	contentRoot.appendChild(content);
	componentRoot = content;
	renderProducts(componentRoot);
}

export function renderPageMain(_root) {
	root = _root;
	router = Router.getInstance();
	_render();
}