export function template(obj) {
	let html = `
		<style>
			@import "style/general.css";
			:host {
				width: 30%;
			}
		</style>
		<div class='component-wrap'>
			<div class='menu'>
				<ul>`;
	let list = "";
	for (let i = 0; i < obj.menu_items.length; i++) {
		list += `
				<li>
					<button>${obj.menu_items[i]}</button>
				</li>`;
	}
	html += `
					${list}
				</ul>
			<div>
		<div>`;
	return html;
}