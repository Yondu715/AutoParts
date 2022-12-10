import { AnimationHandlerFactory } from "../../viewUtils/AnimationHandler.js";


export function template() {
	let animationHandler = AnimationHandlerFactory.createInstance();
	let componentWrap = document.createElement("div");
	componentWrap.classList.add("component-wrap");
	componentWrap.innerHTML = `
		<style>
			@import "public/style/general.css";
			@import "public/style/startPage.css";
			@import "public/style/animations.css";
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

	let fadeBlock = componentWrap.querySelector(".log-content");
	animationHandler.fade(fadeBlock, 1, 0);
	return componentWrap;
}