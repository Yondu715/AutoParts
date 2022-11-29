import { Router } from "../../../router.js";
import { async_acceptApplications, async_deleteApplications, async_getAllApplications } from "../../../../model/Request.js";
import { createTableApplications, jsonToObjects } from "../../../../model/DataAction.js";
import { fade, highlightRow } from "../../../viewTools/AnimationHandler.js";
import { User } from "../../../../model/transport/User.js";


let root = undefined;
let applications = undefined;
let router = undefined;
let main_root = undefined;

function _render() {
	root.innerHTML = "";
	let div_applications = document.createElement("div");
	div_applications.id = "applications";
	let btnPlace = document.createElement("div");
	btnPlace.id = "btn-place";

	let table = createTableApplications(applications.length);
	table.classList.add("table");

	let rows = table.querySelectorAll("tr");
	let id_divs = table.querySelectorAll(".item_id");
	let main_infos = table.querySelectorAll(".item_info");
	let columns = ["id", "login", "password", "role"];

	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < columns.length; j++) {
			let span = document.createElement("span");
			span.className = columns[j];
			span.textContent = applications[i].get()[columns[j]];
			if (!span.classList.contains("id")) {
				main_infos[i].appendChild(span);
			} else {
				id_divs[i].appendChild(span);
			}
		}
	}
	let roles = ["client", "admin"];
	let menus_role = table.querySelectorAll(".roles");
	for (let i = 0; i < menus_role.length; i++) {
		roles.forEach(role => {
			let option_role = document.createElement("option");
			option_role.textContent = role;
			menus_role[i].appendChild(option_role);
		});
	}

	div_applications.appendChild(table);

	let button_accept = document.createElement("button");
	button_accept.textContent = "Принять";
	button_accept.classList.add("btn-submit");
	button_accept.addEventListener("click", _async_acceptApplications);

	let button_delete = document.createElement("button");
	button_delete.textContent = "Удалить";
	button_delete.classList.add("btn-submit");
	button_delete.classList.add("btn_red")
	button_delete.addEventListener("click", _async_deleteApplications);

	btnPlace.appendChild(button_accept);
	btnPlace.appendChild(button_delete);

	root.appendChild(div_applications);
	root.appendChild(btnPlace);
	fade(div_applications, 1.2, 0);
	highlightRow(rows);
}

async function _async_getAllApplications() {
	let response = await async_getAllApplications();
	let data = response.getBody();
	let status = response.getStatus();
	_react_getAllApplications(status, data);
}

function _react_getAllApplications(status, data) {
	switch (status) {
		case 401: {
			router.pageStart(main_root);
		}
		case 200: {
			applications = jsonToObjects(data, User);
			_render();
		}
	}
}

function _getHighlightRows() {
	let rows = document.getElementsByTagName("tr");
	let applications_rows = [];
	for (let i = 0; i < rows.length; i++) {
		if (rows[i].style.background != "") {
			applications_rows.push(rows[i]);
		}
	}
	return applications_rows;
}

function _getAcceptInfo() {
	let rows = _getHighlightRows();
	let jsonApplications = [];
	for (let i = 0; i < rows.length; i++) {
		let cell_id = rows[i].querySelector(".id");
		let cell_login = rows[i].querySelector(".login");
		let cell_password = rows[i].querySelector(".password");
		let cell_role = rows[i].querySelector(".roles");
		let application = {
			id: Number(cell_id.innerText),
			login: cell_login.innerText,
			password: cell_password.innerText,
			role: cell_role.value,
		}
		jsonApplications.push(application);
	}
	return jsonApplications;
}

async function _async_acceptApplications() {
	let jsonApplications = _getAcceptInfo();
	let response = await async_acceptApplications(jsonApplications);
	let status = response.getStatus();
	react_requestInfo(status);
}

function _getDeleteInfo() {
	let rows = _getHighlightRows();
	let jsonApplications_id = [];
	for (let i = 0; i < rows.length; i++) {
		let cell = rows[i].querySelector(".id");
		let application = {
			id: Number(cell.innerText),
		}
		jsonApplications_id.push(application);
	}
	return jsonApplications_id;
}

async function _async_deleteApplications() {
	let jsonApplications_id = _getDeleteInfo();
	let response = await async_deleteApplications(jsonApplications_id);
	let status = response.getStatus();
	react_requestInfo(status);
}

function react_requestInfo(status) {
	switch (status) {
		case 401:{
			router.pageStart(main_root);
		}
		case 204: {
			_async_getAllApplications();
		}
		case 202: {
			_async_getAllApplications();
		}
	}
}

export function renderApplications(_main_root, _root) {
	main_root = _main_root;
	root = _root;
	router = new Router();
	_async_getAllApplications();
}
