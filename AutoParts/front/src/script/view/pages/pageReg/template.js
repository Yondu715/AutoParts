
export function template() {
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
						<span>Регистрация</span>
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
						<div class='password'>
							<label for='password-repeat'>Подтвердите пароль</label>
							<input id='password_repeat' class='text' type='password' autocomplete='off'>
							<span class='bar'></span>
						</div>
						<button class='btn-submit' id='btnRegInfo'>Подать заявку</button>
						<span id='log-status'></span>
					</div>
					<span>Уже есть аккаунт? <button class='btn-path' id='auth'>Авторизоваться</button></span>
				</div>
			</div>
		</div>`;
}