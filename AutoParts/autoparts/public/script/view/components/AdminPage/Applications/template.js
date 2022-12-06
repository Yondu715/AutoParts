export function template(obj) {
	let componentWrap = document.createElement("div");
	componentWrap.classList.add("component-wrap");
	componentWrap.innerHTML = `
			<style>
			@import "public/style/general.css";
			@import "public/style/adminPage.css";
			@import "public/style/animations.css";
			</style>	
		<div id='applications'></div>
		<div id='btn-place'>
			<button id='accept' class='btn-submit'>Принять</button>
			<button id='remove' class='btn-submit btn-red'>Удалить</button>
		</div>
	`
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
	for (let i = 0; i < menus_role.length; i++) {
		roles.forEach(role => {
			let option_role = document.createElement("option");
			option_role.textContent = role;
			menus_role[i].appendChild(option_role);
		});
	}

	div_applications.prepend(table);
	return componentWrap;
}

function createTableApplications(length) {
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

		let choose_role = document.createElement("div");
		choose_role.classList.add("item-role");

		let menu_role = document.createElement("select");
		menu_role.classList.add("roles");

		choose_role.appendChild(menu_role);

		content_div.appendChild(id_div);
		content_div.appendChild(main_info);
		content_div.appendChild(choose_role);
		cell.appendChild(content_div);
		row.appendChild(cell);
		table.appendChild(row);
	}
	return table;
}