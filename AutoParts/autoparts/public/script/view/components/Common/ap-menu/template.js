import { AnimationHandlerFactory } from "../../../viewTools/AnimationHandler.js";

export function template(obj) {
	let animationHandler = AnimationHandlerFactory.createInstance();
	let componentWrap = document.createElement("div");
	componentWrap.classList.add("component-wrap");
	componentWrap.innerHTML = `
		<style>
			@import "public/style/general.css";
			:host {
				width: 25%;
			}
		</style>`;
	let menu = document.createElement("div");
	menu.classList.add("menu");
	let list = document.createElement("ul");
	for (let i = 0; i < obj.menu_items.length; i++) {
		let row = document.createElement("li");
		let btn = document.createElement("button");
		btn.textContent = obj.menu_items[i];
		row.appendChild(btn);
		list.appendChild(row);
	}
	menu.appendChild(list);
	componentWrap.appendChild(menu);
	let buttons = componentWrap.querySelectorAll("button");
	animationHandler.highlightMenu(buttons);
	return componentWrap;
}