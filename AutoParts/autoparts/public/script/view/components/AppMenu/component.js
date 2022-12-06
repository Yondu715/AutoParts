import { template } from "./template.js";


class AppMenu extends HTMLElement {
	menu_items;
	menu_actions;

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
	}

	setMenuItems(value){
		this.menu_items = value;
	}

	setMenuActions(value){
		this.menu_actions = value;
	}

	_render() {
		this._root.replaceChildren();
		this._root.appendChild(template(this));
		let buttons = this._root.querySelectorAll("button");
		for (let i = 0; i < this.menu_actions.length; i++) {
			buttons[i].addEventListener("click", this.menu_actions[i]);
		}
	}

	connectedCallback() {
		this._render();
	}
	
}

customElements.define("app-menu", AppMenu);