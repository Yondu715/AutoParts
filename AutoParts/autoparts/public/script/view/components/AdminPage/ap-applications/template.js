import { AnimationHandlerFactory } from "../../../viewUtils/AnimationHandler.js";
import { createTableApplications } from "../../../viewUtils/viewFuncs.js";

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
			<div id='applications' class='component-content'></div>
			<div id='btn_place'>
				<button id='accept' class='btn-submit'>Принять</button>
				<button id='remove' class='btn-submit btn-red'>Удалить</button>
			</div>`;
	let div_applications = componentWrap.querySelector("#applications");
	let table = createTableApplications(obj._applications.length);
	table.classList.add("table");

	let rows = table.querySelectorAll("tr");
	let id_divs = table.querySelectorAll(".item-id");
	let main_infos = table.querySelectorAll(".item-info");
	let columns = ["id", "login", "password", "role"];

	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < columns.length; j++) {
			let span = document.createElement("span");
			span.className = columns[j];
			span.textContent = obj._applications[i].get()[columns[j]];
			if (!span.classList.contains("id")) {
				main_infos[i].appendChild(span);
			} else {
				id_divs[i].appendChild(span);
			}
		}
	}
	let roles = ["client", "admin"];
	let menus_role = table.querySelectorAll(".roles");
	menus_role.forEach(menu_role => {
		menu_role.addEventListener("click", (e) => e.stopPropagation());
		roles.forEach(role => {
			let option_role = document.createElement("option");
			option_role.textContent = role;
			menu_role.appendChild(option_role);
		});
	});

	div_applications.prepend(table);
	animationHandler.fade(div_applications, 1.2, 0);
	animationHandler.highlightRows(rows);
	return componentWrap;
}
