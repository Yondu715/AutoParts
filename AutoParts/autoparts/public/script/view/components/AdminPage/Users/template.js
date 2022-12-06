export function template(obj) {
	let componentWrap = document.createElement("div");
	componentWrap.classList.add("component-wrap");
	componentWrap.innerHTML = `
			<style>
		@import "public/style/general.css";
		@import "public/style/adminPage.css";
		@import "public/style/animations.css";
		</style>
		<div id='users'></div>
		<div id='btn-place'>
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
	return componentWrap;
}

function createTableUsers(length) {
	let table = document.createElement("table");
	for (let i = 0; i < length; i++) {
		let row = document.createElement("tr");
		let cell = document.createElement("td");
		let content_div = document.createElement("div");
		content_div.classList.add("item");

		let id_div = document.createElement("div");
		id_div.classList.add("item-id");

		let main_info = document.createElement("div");
		main_info.classList.add("item-info");

		let role_div = document.createElement("div");
		role_div.classList.add("item-role");

		content_div.appendChild(id_div);
		content_div.appendChild(main_info);
		content_div.appendChild(role_div);
		cell.appendChild(content_div);
		row.appendChild(cell);
		table.appendChild(row);
	}
	return table;
}