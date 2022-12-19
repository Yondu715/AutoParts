import "../../../../style/general.css";
export function template(obj) {
	let componentWrap = document.createElement("div");
	componentWrap.classList.add("component-wrap");
	componentWrap.innerHTML = `
		<style>
			@import "src/style/general.css";
			@import "src/style/startPage.css";
			@import "src/style/animations.css";
		</style>
		<div class='log-page'>
			<div class='log-content'>
				<div class='log'>
					<span>Авторизация</span>
					<div class='login'>
						<label for='login'>Логин</label>
						<input id='login' class='text' type='text' autocomplete='off'>
						<span class='bar'></span>
					</div>
					<div class='password'>
						<label for='password'>Пароль</label>
						<input id='password' class='text' type='password' autocomplete='off'>
						<span class='bar'></span>
					</div>
					<button class='btn-submit' id='btnAuthInfo'>Войти</button>
					<span id='log_status'></span>
				</div>
				<span>Еще нет аккаунта? <button class='btn-path' id='reg'>Зарегистрироваться</button></span>
			</div>
		</div>`;
	let login_input = componentWrap.querySelector("#login");
	login_input.addEventListener("change", (event) => {
		let value = event.target.value;
		obj.setLogin(value);
	});
	let password_input = componentWrap.querySelector("#password");
	password_input.addEventListener("change", (event) => {
		let value = event.target.value;
		obj.setPassword(value);
	});
	return componentWrap;
}