export function template(obj) {
	let componentWrap = document.createElement("div");
	componentWrap.classList.add("component-wrap");
	componentWrap.innerHTML = `
			<style>
			@import "public/style/general.css";
			@import "public/style/mainPage.css";
			@import "public/style/animations.css";
			</style>	
	`;
	let fields = ["name", "sellerName", "date", "brand", "model", "price"];
	let fields_ru = ["Название", "Продавец", "Дата публикации", "Марка", "Модель", "Цена"]

	let div_productInfo = createProductInfo();

	let div_info = div_productInfo.querySelector(".info");
	for (let i = 0; i < fields.length; i++) {
		let span = document.createElement("span");
		span.textContent = fields_ru[i] + ": " + obj._product.get()[fields[i]];
		if (fields[i] == "price") {
			span.textContent += " ₽";
		}
		div_info.appendChild(span);
	}
	componentWrap.appendChild(div_productInfo);


	if (obj._product.get()["sellerName"] != localStorage.getItem("login")) {
		let btnPlace = document.createElement("div");
		btnPlace.id = "btn-place";
		let button = document.createElement("button");
		button.textContent = "Добавить в корзину";
		button.classList.add("btn-submit");
		btnPlace.appendChild(button);
		componentWrap.appendChild(btnPlace);
	}
	return componentWrap;
}

function createProductInfo() {

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