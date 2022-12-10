export function showImage(input, image_place) {
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
		showImage(input, image_place);
	});
}

export function createTableApplications(length) {
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

export function createTableUsers(length) {
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

export function createTableProducts(length) {
	let table = document.createElement("table");
	for (let i = 0; i < length; i++) {
		let row = document.createElement("tr");
		let cell = document.createElement("td");
		let content_div = document.createElement("div");
		content_div.classList.add("item");

		let image_div = document.createElement("div");
		image_div.classList.add("item-image");

		let main_info = document.createElement("div");
		main_info.classList.add("item-info");

		let price_info = document.createElement("div");
		price_info.classList.add("item-price");

		content_div.appendChild(image_div);
		content_div.appendChild(main_info);
		content_div.appendChild(price_info);
		cell.appendChild(content_div);
		row.appendChild(cell);
		table.appendChild(row);
	}
	return table;
}

export function createProductInfo() {

	let div_productInfo = document.createElement("div");
	div_productInfo.id = "product_info";

	let left_part = document.createElement("div");
	left_part.classList.add("left-part");
	let right_part = document.createElement("div");
	right_part.classList.add("right-part");

	let div_info = document.createElement("div");
	div_info.classList.add("info");

	let div_image = document.createElement("div");
	div_image.classList.add("product-image");
	let image = document.createElement("img");
	image.classList.add("image");
	div_image.appendChild(image);

	left_part.appendChild(div_info);
	right_part.appendChild(div_image);

	div_productInfo.appendChild(left_part);
	div_productInfo.appendChild(right_part);
	return div_productInfo;
}