export function template(obj) {

	let roles_list = ["client", "admin"];
	let roles = ``;
	roles_list.forEach(role => {
		roles += `<option>${role}</option>`;
	});

	let html = `
		<div class='component-wrap'>
			<style>
				@import "style/general.css";
				@import "style/adminPage.css";
				@import "style/animations.css";
			</style>
			<div id='applications' class='component-content fade'>
				<table class='table'>`

	let info = ``;
	obj._applications.forEach(application => {
		info += `
			<tr>
				<td>
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
					</div>
				</td>
			</tr>`;
	});
	html += `
					${info}
				</table>
			</div>
			<div id='btn_place'>
				<button id='accept' class='btn-submit'>Принять</button>
				<button id='remove' class='btn-submit btn-red'>Удалить</button>
			</div>
		</div>`;
	return html;
}
