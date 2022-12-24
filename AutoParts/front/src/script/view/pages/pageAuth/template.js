export function template(obj) {
	return `
		<div class='component-wrap'>
			<style>
				@import "style/general.css";
				@import "style/startPage.css";
				@import "style/animations.css";
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
			</div>
		</div>`;
}