import { images } from "../../../viewUtils/images";

export function template(obj) {
	let fields = ["name", "brand", "model", "price"];
	let fields_ru = ["Название", "Марка", "Модель", "Стоимость"];

	let html = `
		<style>
			@import "style/general.css";
			@import "style/mainPage.css";
			@import "style/animations.css";
		</style>
		<div class='component-wrap'>
			<div id='sale' class='component-content fade'>
				<div class='product-info'>`;
	let info = ``;
	for (let i = 0; i < fields.length; i++) {
		info += `
			<div class='${fields[i]}'>
				<label>${fields_ru[i]}: </label>
				<input id='${fields[i]}' class='text' autocomplete='off'>
				<span class='bar'></span>
			</div>`;
	}
	html += `
					${info}
					<span id='sale_status'><span>
				</div>
				<div class='product-image'>
					<div class='dropArea'>
						<img id='image' src=${images["dragAndDrop"]}>
					</div>
					<label class='input-file'>
						<span>Выберите файл</span>
						<input id='input_image' type='file' accept='image\\*'>
					</label>
				</div>
			</div>
			<div id='btn_place'>
				<button id='accept' class='btn-submit'>Выставить на продажу</button>
			</div>
		</div>`;
	return html;
}