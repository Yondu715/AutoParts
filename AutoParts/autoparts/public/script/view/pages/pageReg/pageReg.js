import { check_valid } from "../../../model/DataAction.js";
import { Router } from "../../router.js";
import { fade } from "../../AnimationHandler.js";
import {User} from "../../../model/transport/User.js";
import { reg } from "../../../model/Request.js";


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
									<input id='password-repeat' class='text' type='password' autocomplete='off'>
									<span class='bar'></span>
								</div>
								<button class='btn-submit' id='btnRegInfo'>Зарегистрироваться</button>
								<span id='log-status'></span>
							</div>
							<span>Уже есть аккаунт? <button class='btn-path' id='auth'>Авторизоваться</button></span>
						</div>
					</div>`;
	let fadeBlock = document.getElementsByClassName("log-content")[0];
	let btnAuth = document.getElementById("auth");
	let btnReg = document.getElementById("btnRegInfo");
	error_span = document.getElementById("log-status");
	btnAuth.addEventListener("click", () => {
		router.pageAuth(root);
	});
	btnReg.addEventListener("click", _sendRegInfo);
	fade(fadeBlock, 1, 0);
}

function _getRegInfo() {
	let login = document.getElementById("login").value
	let password = document.getElementById("password").value
	let repeat_password = document.getElementById("password-repeat").value
	let jsonRegInfo = {
		"login": login,
		"password": password,
		"repeat-password": repeat_password
	}
	let user = new User(jsonRegInfo);
	return user;
}

async function _sendRegInfo() {
	let user = _getRegInfo();
	if (check_valid(user)) {
		if ((user.get()["password"] == user.get()["repeat-password"])) {
			let response = await reg(user);
			let status = response.getStatus();
			status_react(status);
		} else {
			error_span.textContent = "Пароли не совпадают";
		}
	} else {
		error_span.textContent = "Не все поля были заполнены";
	}
}

function status_react(status){
	if (status == 200) {
		router.pageAuth(root);
	} else if (status == 400) {
		error_span.textContent = "Нельзя использовать данный логин";
	}
}

export default function _init(_root) {
	root = _root;
	router = new Router();
	_render();
}