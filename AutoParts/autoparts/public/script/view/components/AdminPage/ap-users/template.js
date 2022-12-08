import { AnimationHandlerFactory } from "../../../viewTools/AnimationHandler.js";
import { createTableUsers } from "../../../viewTools/viewFuncs.js";

export function template(obj) {
	let animationHandler = AnimationHandlerFactory.createInstance();
	let componentWrap = document.createElement("div");
	componentWrap.classList.add("component-wrap");
	componentWrap.innerHTML = `
			<style>
		@import "public/style/general.css";
		@import "public/style/adminPage.css";
		@import "public/style/animations.css";
		</style>
		<div id='users' class='component-content'></div>
		<div id='btn_place'>
			<button id='remove' class='btn-submit btn-red'>Удалить</button>
		</div>
	`;
	let div_users = componentWrap.querySelector("#users");

	let table = createTableUsers(obj._users.length);
	table.classList.add("table");

	let rows = table.querySelectorAll("tr");
	let id_divs = table.querySelectorAll(".item-id");
	let role_divs = table.querySelectorAll(".item-role");
	let main_infos = table.querySelectorAll(".item-info");
	let columns = ["id", "login", "password", "role"];

	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < columns.length; j++) {
			let span = document.createElement("span");
			span.classList.add(columns[j]);
			span.textContent = obj._users[i].get()[columns[j]];
			if (span.classList.contains("id")) {
				id_divs[i].appendChild(span);
			} else if (span.classList.contains("role")) {
				role_divs[i].appendChild(span);
			}
			else {
				main_infos[i].appendChild(span);
			}
		}
	}
	div_users.appendChild(table);
	animationHandler.fade(div_users, 1.2, 0);
	animationHandler.highlightRows(rows);
	return componentWrap;
}