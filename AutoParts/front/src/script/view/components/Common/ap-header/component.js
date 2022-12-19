import { template } from "./template.js";

class AppHeader extends HTMLElement {
	title = undefined;
	username = undefined;
	onlogout = undefined;
	_root = undefined;
	_timer = undefined;

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
	}

	connectedCallback() {
		this._render();
	}

	setTitle(value){
		this.title = value;
		this._refresh();
	}

	setUsername(value){
		this.username = value;
		this._refresh();
	}

	setLogout(value){
		this.onlogout = value;
		this._refresh();
	}

	_render() {
		this._root.replaceChildren();
		this._root.innerHTML = template(this);
		let btnLogout = this._root.querySelector(".btn-logout");
		btnLogout.addEventListener("click", this.onlogout);
	}

	_refresh(){
		if (this._timer){
			clearTimeout(this._timer);
		}
		this._timer = setTimeout(this._render.bind(this));
	}

}

customElements.define("ap-header", AppHeader);