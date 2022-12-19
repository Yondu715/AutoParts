export function template(obj) {
	let list = "";
	for (let i = 0; i <obj.menu_items.length; i++) {
		list += `
			<li>
				<button>${obj.menu_items[i]}</button>
			</li>`
	}

	return `
		<style>
			@import "src/style/general.css";
			:host {
				width: 25%;
			}
		</style>
		<div class='component-wrap'>
			<div class='menu'>
				<ul>
					${list}
				</ul>
			<div>
		<div>
	`;
}