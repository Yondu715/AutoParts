export function template(obj) {
	let info = ``;
	obj._users.forEach(user => {
		let user_info = `
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
			</div>`;
		info += `
			<tr>
				<td>${user_info}</td>
			</tr>`;
	});
	return `
		<div class='component-wrap'>
			<style>
				@import "src/style/general.css";
				@import "src/style/adminPage.css";
				@import "src/style/animations.css";
			</style>
			<div id='users' class='component-content fade'>
				<table class='table'>
					${info}
				</table>
			</div>
			<div id='btn_place'>
				<button id='remove' class='btn-submit btn-red'>Удалить</button>
			</div>
		</div>`;
}