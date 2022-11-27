import { Router } from "../../../router.js";
import { create_table_users, jsonToObjects} from "../../../../model/DataAction.js";
import { fade, highlightRow } from "../../../AnimationHandler.js";
import { User } from "../../../../model/transport/User.js";
import { async_deleteUsers, async_getAllUsers } from "../../../../model/Request.js";


let root = undefined;
let users = undefined;
let router = undefined;
let main_root = undefined;

async function _getUsers() {
	let response = await async_getAllUsers();
	let data = response.getBody();
	let status = response.getStatus();
	_react_getUsers(status, data);
}

function _react_getUsers(status, data) {
	if (status == 401) {
		router.pageStart(main_root);
	} else if (status == 200) {
		users = jsonToObjects(data, User);
		_render();
	}
}

function _render() {
	root.innerHTML = "";
	let div_users = document.createElement("div");
	div_users.id = "users";
	let btnPlace = document.createElement("div");
	btnPlace.id = "btn-place";

	let table = create_table_users(users.length);
	table.classList.add("table");
	
	let rows = table.querySelectorAll("tr");
	let id_divs = table.querySelectorAll(".item_id");
	let role_divs = table.querySelectorAll(".item_role");
	let main_infos = table.querySelectorAll(".item_info");
	let columns = ["id", "login", "password", "role"];
	
	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < columns.length; j++) {
			let span = document.createElement("span");
			span.classList.add(columns[j]);
			span.textContent = users[i].get()[columns[j]];
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

	let button_delete = document.createElement("button");
	button_delete.textContent = "Удалить";
	button_delete.classList.add("btn-submit");
	button_delete.classList.add("btn_red");
	button_delete.addEventListener("click", _sendDeleteInfo);

	btnPlace.appendChild(button_delete);

	root.appendChild(div_users);
	root.appendChild(btnPlace);
	fade(div_users, 1.2, 0);
	highlightRow(rows);
}

function _getDeleteInfo() {
	let rows = document.getElementsByTagName("tr");
	let users_id = [];
	for (let i = 0; i < rows.length; i++) {
		if (rows[i].style.background != "") {
			let cell = rows[i].querySelector(".id");
			let user = {
				id: Number(cell.innerText)
			}
			users_id.push(user);
		}
	}
	return users_id;
}

async function _sendDeleteInfo() {
	let jsonUsersID = _getDeleteInfo();
	let response = await async_deleteUsers(jsonUsersID);
	let status = response.getStatus();
	react_deleteInfo(status);
}

function react_deleteInfo(status) {
	if (status == 401) {
		router.pageStart(main_root);
	} else if (status == 204) {
		_getUsers();
	}
}

export default function init(_main_root, _root) {
	main_root = _main_root;
	root = _root;
	router = new Router();
	_getUsers();
}
