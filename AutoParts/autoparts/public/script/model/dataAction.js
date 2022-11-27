export function check_valid(object) {
	let keys = Object.keys(object.get());
	for (let i = 0; i < keys.length; i++) {
		if (object.get()[keys[i]] == "") return false;
	}
	return true;
}

export function create_table_products(length) {
	let table = document.createElement("table");
	for (let i = 0; i < length; i++) {
		let row = document.createElement("tr");
		let cell = document.createElement("td");
		let content_div = document.createElement("div");
		content_div.classList.add("item");

		let image_div = document.createElement("div");
		image_div.classList.add("item_image");

		let main_info = document.createElement("div");
		main_info.classList.add("item_info");

		let price_info = document.createElement("div");
		price_info.classList.add("item_price");

		/*
		for (let j = 0; j < columns.length; j++) {
			let span = document.createElement("span");
			span.classList.add(columns[j]);
			span.textContent = products[i].get()[columns[j]];
			if (span.classList.contains("image")) {
				let image = document.createElement("img");
				image.src = span.textContent;
				image_div.appendChild(image);
			} else if (span.classList.contains("price")) {
				span.textContent += " ₽";
				price_info.appendChild(span);
			} else {
				main_info.appendChild(span);
			}
		}*/
		content_div.appendChild(image_div);
		content_div.appendChild(main_info);
		content_div.appendChild(price_info);
		cell.appendChild(content_div);
		row.appendChild(cell);
		table.appendChild(row);
	}
	return table;
}

export function create_table_applications(length) {
	let table = document.createElement("table");
	for (let i = 0; i < length; i++) {
		let row = document.createElement("tr");
		let cell = document.createElement("td");
		let content_div = document.createElement("div");
		content_div.classList.add("item");

		let id_div = document.createElement("div");
		id_div.classList.add("item_id");

		let main_info = document.createElement("div");
		main_info.classList.add("item_info");

		let choose_role = document.createElement("div");
		choose_role.classList.add("item_role");

		let menu_role = document.createElement("select");
		menu_role.classList.add("roles");
		/*let roles = ["client", "admin"];
		roles.forEach(role => {
			let option_role = document.createElement("option");
			option_role.textContent = role;
			menu_role.appendChild(option_role);
		});*/
		choose_role.appendChild(menu_role);

		/*
		for (let j = 0; j < columns.length; j++) {
			let span = document.createElement("span");
			span.className = columns[j];
			span.textContent = applications[i].get()[columns[j]];
			if (!span.classList.contains("id")){
				main_info.appendChild(span);
			} else{
				id_div.appendChild(span);
			}
		} */
		content_div.appendChild(id_div);
		content_div.appendChild(main_info);
		content_div.appendChild(choose_role);
		cell.appendChild(content_div);
		row.appendChild(cell);
		table.appendChild(row);
	}
	return table;
}

export function create_table_users(length) {
	let table = document.createElement("table");
	for (let i = 0; i < length; i++) {
		let row = document.createElement("tr");
		let cell = document.createElement("td");
		let content_div = document.createElement("div");
		content_div.classList.add("item");

		let id_div = document.createElement("div");
		id_div.classList.add("item_id");

		let main_info = document.createElement("div");
		main_info.classList.add("item_info");

		let role_div = document.createElement("div");
		role_div.classList.add("item_role");
		/*
		for (let j = 0; j < columns.length; j++) {
			let span = document.createElement("span");
			span.classList.add(columns[j]);
			span.textContent = users[i].get()[columns[j]];
			if (span.classList.contains("id")) {
				id_div.appendChild(span);
			} else if (span.classList.contains("role")){
				role_div.appendChild(span);
			}
			 else {
				main_info.appendChild(span);
			}
		}*/
		content_div.appendChild(id_div);
		content_div.appendChild(main_info);
		content_div.appendChild(role_div);
		cell.appendChild(content_div);
		row.appendChild(cell);
		table.appendChild(row);
	}
	return table;
}


export function create_productInfo() {

	let div_productInfo = document.createElement("div");
	div_productInfo.id = "product-info";

	let left_part = document.createElement("div");
	left_part.classList.add("left-part");
	let right_part = document.createElement("div");
	right_part.classList.add("right-part");

	let div_info = document.createElement("div");
	div_info.classList.add("info");

	/*
	for (let i = 0; i < fields.length; i++) {
		let span = document.createElement("span");
		span.textContent = fields_ru[i] + ": " + product.get()[fields[i]];
		if (fields[i] == "price") {
			span.textContent += " ₽";
		}
		div_info.appendChild(span);
	}*/

	let div_image = document.createElement("div");
	div_image.classList.add("product-image");
	let image = document.createElement("img");
	image.classList.add("image");
	/*image.src = product.get()["image"];*/
	div_image.appendChild(image);

	left_part.appendChild(div_info);
	right_part.appendChild(div_image);

	div_productInfo.appendChild(left_part);
	div_productInfo.appendChild(right_part);
	return div_productInfo;
}


export function show_image(input, image_place) {
	let file = input.files[0];
	let reader = new FileReader();
	reader.onload = () => {
		image_place.src = reader.result;
	}
	reader.readAsDataURL(file);
}

export function dragAndDrop(dropArea, input, image_place) {
	["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
		dropArea.addEventListener(eventName, (event) => {
			event.preventDefault();
			event.stopPropagation();
		});
	});

	["dragenter", "dragover"].forEach(eventName => {
		dropArea.addEventListener(eventName, (event) => {
			dropArea.classList.add("highlight");
		});
	});

	["dragleave", "drop"].forEach(eventName => {
		dropArea.addEventListener(eventName, (event) => {
			dropArea.classList.remove("highlight");
		});
	});

	dropArea.addEventListener("drop", (event) => {
		let dt = event.dataTransfer;
		let files = dt.files;
		input.files = files;
		show_image(input, image_place);
	});

}

export function jsonToObjects(json, classConvert) {
	if (!Array.isArray(json)) {
		let object = new classConvert(json);
		return object;
	}

	let res = [];
	for (let i = 0; i < json.length; i++) {
		let object = new classConvert(json[i]);
		res.push(object);
	}
	return res;
}