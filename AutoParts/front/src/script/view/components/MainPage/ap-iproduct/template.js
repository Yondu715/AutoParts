
export function template(obj) { 

	let info = `
		<span>Название: ${obj._product.get()["name"]}</span>
		<span>Продавец: ${obj._product.get()["sellerName"]}</span>
		<span>Дата публикации: ${obj._product.get()["date"]}</span>
		<span>Марка: ${obj._product.get()["brand"]}</span>
		<span>Модель: ${obj._product.get()["model"]}</span>
		<span>Цена: ${obj._product.get()["price"]} ₽</span>
	`;

	let btnPlace = ``;
	if (obj._product.get()["sellerName"] != localStorage.getItem("login")) {
		btnPlace = `
			<div id='btn_place'>
				<button class='btn-submit'>Добавить в корзину</button>
			</div>
		`;
	}

	return `
		<style>
			@import "src/style/general.css";
			@import "src/style/mainPage.css";
			@import "src/style/animations.css";
		</style>
		<div class='component-wrap'>
			<div id='product_info' class='component-content fade'>
				<div class='left-part'>
					<div class='info'>
						${info}
					</div>
				</div>
				<div class='right-part'>
					<div class='product-image'>
						<img class='image' src=${obj._product.get()["image"]}>
					</div>
				</div>
			</div>
			${btnPlace}
		</div>
	`;
}