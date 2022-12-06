import { checkValid } from "../../model/DataAction.js";
import { RouterFactory } from "../../view/router/router.js";
import { fade } from "../viewTools/AnimationHandler.js";
import { User } from "../../model/transport/User.js";
import { async_reg } from "../../model/Request.js";


let root = undefined;
let error_span = undefined;
let router = undefined;

function _render() {
	root.innerHTML = `<div class='log-page'>
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
					</div>`;
	let fadeBlock = root.querySelector(".log-content");
	let btnAuth = root.querySelector("#auth");
	let btnReg = root.querySelector("#btnRegInfo");
	error_span = root.querySelector("#log-status");
	btnAuth.addEventListener("click", router.pageAuth);
	btnReg.addEventListener("click", _async_sendRegInfo);
	fade(fadeBlock, 1, 0);
}

function _getRegInfo() {
	let login = root.querySelector("#login").value
	let password = root.querySelector("#password").value
	let repeat_password = root.querySelector("#password_repeat").value
	let jsonRegInfo = {
		"login": login,
		"password": password,
		"repeat-password": repeat_password,
	}
	let user = new User(jsonRegInfo);
	return user;
}

async function _async_sendRegInfo() {
	let user = _getRegInfo();
	if (!checkValid(user)) {
		error_span.textContent = "Не все поля были заполнены";
		return;
	}

	let password = user.get()["password"];
	let repeat_password = user.get()["repeat-password"];
	if (password != repeat_password) {
		error_span.textContent = "Пароли не совпадают";
		return;
	}
	let response = await async_reg(user);
	let status = response.getStatus();
	_react_regInfo(status);
}

function _react_regInfo(status) {
	switch (status) {
		case 200:
			router.pageAuth();
			break;
		case 409:
			error_span.textContent = "Нельзя использовать данный логин";
			break;
	}
}

export function renderPageReg(_root) {
	root = _root;
	router = RouterFactory.createInstance();
	_render();
}