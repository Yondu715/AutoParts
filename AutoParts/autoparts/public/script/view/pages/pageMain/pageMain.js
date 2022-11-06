import { animationHandler } from "../../animationHandler.js";
import router from "../../router.js";
import sale from "./components/sale.js";
import userProducts from "./components/userProducts.js";
import products from "./components/products.js";

export default (function () {
	let root = undefined;
	let componentRoot = undefined;

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
		userLogin.textContent = localStorage.getItem("login");
		btnLogout.addEventListener("click", _logout);
	}

	function _logout() {
		let animationBlock = document.querySelector(".overPage");
		localStorage.removeItem("token");
		localStorage.removeItem("login");
		animationHandler.cover(animationBlock, 0.5, 0);
		setTimeout(() => {
			router.pageStart(root);
		}, 800);
	}

	/* RENDER MENU */

	function _renderMenu() {
		let menu_root = document.getElementById("wrap-content");
		let menu = document.createElement("div");
		menu.className = "menu";
		let menu_items = ["Запчасти", "Продать", "Мои товары", "Корзина"];
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
		let menu_funcs = [() => products.render(componentRoot), () => sale.render(componentRoot), () => userProducts.render(componentRoot)];
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener("click", menu_funcs[i]);
		}
		animationHandler.highlightMenu(buttons);
	}

	function _renderContent(){
		let content_root = document.getElementById("wrap-content");
		let content = document.createElement("div");
		content.id = "content";
		content_root.appendChild(content);
		products.render(content);
	}

	function _init(_root) {
		root = _root;
		_render();
	}

	return {
		render: _init,
	};

})();