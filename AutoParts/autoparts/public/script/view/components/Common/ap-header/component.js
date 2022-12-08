import { template } from "./template.js";

class AppHeader extends HTMLElement {
	title;
	username;
	onlogout;

	constructor() {
		super();
		this._root = this.attachShadow({ mode: "closed" });
	}

	connectedCallback() {
		this._render();
	}

	setTitle(value){
		this.title = value;
	}

	setUsername(value){
		this.username = value;
	}

	setLogout(value){
		this.onlogout = value;
	}

	_render() {
		this._root.replaceChildren();
		this._root.appendChild(template(this));
		let btnLogout = this._root.querySelector(".btn-logout");
		btnLogout.addEventListener("click", this.onlogout);
	}

}

customElements.define("ap-header", AppHeader);