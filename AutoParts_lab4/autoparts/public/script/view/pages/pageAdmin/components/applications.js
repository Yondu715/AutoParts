import { Router } from "../../../router.js";
import { async_acceptApplication, async_deleteApplication, async_getAllApplications } from "../../../../model/Request.js";
import { create_table_applications, jsonToObjects } from "../../../../model/DataAction.js";
import { fade, highlightRow } from "../../../AnimationHandler.js";
import { Application } from "../../../../model/transport/Application.js";


let root = undefined;
let applications = undefined;
let router = undefined;
let main_root = undefined;

async function _getAllApplications() {
	let response = await async_getAllApplications();
	let data = response.getBody();
	let status = response.getStatus();
	_react_getAllApplications(status, data);
}

function _react_getAllApplications(status, data) {
	if (status == 401) {
		router.pageStart(main_root);
	} else if (status == 200) {
		applications = jsonToObjects(data, Application);
		_render();
	}
}

function _render() {
	root.innerHTML = "";
	let div_applications = document.createElement("div");
	div_applications.id = "applications";
	let btnPlace = document.createElement("div");
	btnPlace.id = "btn-place";

	let table = create_table_applications(applications.length);
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
	button_accept.addEventListener("click", _acceptApplications);

	let button_delete = document.createElement("button");
	button_delete.textContent = "Удалить";
	button_delete.classList.add("btn-submit");
	button_delete.classList.add("btn_red")
	button_delete.addEventListener("click", _deleteApplications);

	btnPlace.appendChild(button_accept);
	btnPlace.appendChild(button_delete);

	root.appendChild(div_applications);
	root.appendChild(btnPlace);
	fade(div_applications, 1.2, 0);
	highlightRow(rows);
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

async function _acceptApplications(){
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
	let response = await async_acceptApplication(jsonApplications);
	let status = response.getStatus();
	react_requestInfo(status);
}

async function _deleteApplications(){
	let rows = _getHighlightRows();
	let jsonApplications_id = [];
	for (let i = 0; i < rows.length; i++) {
		let cell = rows[i].querySelector(".id");
		let application = {
			id: Number(cell.innerText),
		}
		jsonApplications_id.push(application);
	}
	let response = await async_deleteApplication(jsonApplications_id);
	let status = response.getStatus();
	react_requestInfo(status);
}

function react_requestInfo(status){
	if (status == 401) {
		router.pageStart(main_root);
	} else if (status == 204 || status == 202) {
		_getAllApplications();
	}
}

export default function init(_main_root, _root) {
	main_root = _main_root;
	root = _root;
	router = new Router();
	_getAllApplications();
}
