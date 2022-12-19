export function template(obj) {
	
	let roles_list = ["client", "admin"];
	let roles = ``;
	roles_list.forEach(role => {
		roles += `<option>${role}</option>`;	
	});
	
	let info = ``;
	obj._applications.forEach(application => {
		let application_info = `
			<div class='item'>
				<div class='item-id'>
					<span class='id'>${application.get()["id"]}</span>
				</div>
				<div class='item-info'>
					<span class='login'>${application.get()["login"]}</span>
					<span class='password'>${application.get()["password"]}</span>
				</div>
				<div class='item-role'>
					<select class='roles'>
						${roles}
					</select>
				</div>
			</div>`;
		info += `
			<tr>
				<td>${application_info}</td>
			</tr>`;
	});
	return `
		<div class='component-wrap'>
			<style>
				@import "src/style/general.css";
				@import "src/style/adminPage.css";
				@import "src/style/animations.css";
			</style>
			<div id='applications' class='component-content fade'>
				<table class='table'>
					${info}
				</table>
			</div>
			<div id='btn_place'>
				<button id='accept' class='btn-submit'>Принять</button>
				<button id='remove' class='btn-submit btn-red'>Удалить</button>
			</div>
		</div>`;
}
