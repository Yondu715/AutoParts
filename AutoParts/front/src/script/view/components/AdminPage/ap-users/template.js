export function template(obj) {
	let html = `
		<div class='component-wrap'>
			<style>
				@import "style/general.css";
				@import "style/adminPage.css";
				@import "style/animations.css";
			</style>
			<div id='users' class='component-content fade'>
				<table class='table'>
	`;
	let user_info = ``;
	obj._users.forEach(user => {
		user_info += `
		<tr>
			<td>
				<div class='item'>
					<div class='item-id'>
						<span class='id'>${user.get()["id"]}</span>
					</div>
					<div class='item-info'>
						<span class='login'>${user.get()["login"]}</span>
						<span class='password'>${user.get()["password"]}</span>
					</div>
					<div class='item-role'>
						<span class='password'>${user.get()["role"]}</span>
					</div>
				</div>
			</td>
		</tr>`;
	});
	html += `
		${user_info}
				</table>
			</div>
			<div id='btn_place'>
				<button id='remove' class='btn-submit btn-red'>Удалить</button>
			</div>
		</div>
	`
	return html;
}