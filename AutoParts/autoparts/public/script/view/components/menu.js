export function createMenu(menu_items, menu_funcs) {
	let menu = document.createElement("div");
	let list = document.createElement("ul");
	for (let i = 0; i < menu_items.length; i++) {
		let row = document.createElement("li");
		let btn = document.createElement("button");
		btn.textContent = menu_items[i];
		row.appendChild(btn);
		list.appendChild(row);
	}
	menu.appendChild(list);

	let buttons = list.getElementsByTagName("button");
	for (let i = 0; i < menu_funcs.length; i++) {
		buttons[i].addEventListener("click", menu_funcs[i]);
	}
	return {
		menu: menu,
		buttons: buttons,
	}
}