import { template } from "./template.js";
import { AnimationHandlerFactory } from "../../../viewUtils/AnimationHandler.js";


class AppMenu extends HTMLElement {
	menu_items = [];
	menu_actions = [];
	_animationHandler = AnimationHandlerFactory.createInstance();

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
	}

	setMenuItems(value){
		this.menu_items = value;
		this._refresh();
	}

	setMenuActions(value){
		this.menu_actions = value;
		this._refresh();
	}

	_render() {
		this._root.replaceChildren();
		this._root.innerHTML = template(this);
		let buttons = this._root.querySelectorAll("button");
		for (let i = 0; i < this.menu_actions.length; i++) {
			buttons[i].addEventListener("click", this.menu_actions[i]);
		}
		this._animationHandler.highlightMenu(buttons);
		
	}

	connectedCallback() {
		this._render();
	}

	_refresh() {
		if (this._timer) {
			clearTimeout(this._timer);
		}
		this._timer = setTimeout(this._render.bind(this));
	}
	
}

customElements.define("ap-menu", AppMenu);