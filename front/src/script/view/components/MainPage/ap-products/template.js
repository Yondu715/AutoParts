export function template(obj) {
	let html = `
		<div class='component-wrap'>
			<style>
				@import "style/general.css";
				@import "style/mainPage.css";
				@import "style/animations.css";
			</style>	
			<div id='products' class='component-content fade'>
				<table class='table'>`;
	let info = ``;
	obj._products.forEach(product => {
		info += `
			<tr>
				<td>
					<div class='item'>
						<div class='item-image'>
							<img src=${product.get()["image"]}>
						</div>
						<div class='item-info'>
							<span class='id'>${product.get()["id"]}</span>
							<span class='name'>${product.get()["name"]}</span>
							<span class='sellerName'>${product.get()["sellerName"]}</span>
							<span class='date'>${product.get()["date"]}</span>
							<span class='brand'>${product.get()["brand"]}</span>
							<span class='model'>${product.get()["model"]}</span>
						</div>
						<div class='item-price'>
							<span class='price'>${product.get()["price"]} ₽</span>
						</div>
					</div>
				</td>
			</tr>`;
	});
	html += `
					${info}
				</table>
			</div>
		</div>`;
	return html;
}
