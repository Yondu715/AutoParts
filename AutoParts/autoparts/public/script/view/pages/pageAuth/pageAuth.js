import { checkValid } from "../../../model/DataAction.js";
import { Router } from "../../router.js";
import { fade } from "../../viewTools/AnimationHandler.js";
import { User } from "../../../model/transport/User.js";
import { async_auth } from "../../../model/Request.js";

let root = undefined;
let error_span = undefined;
let router = undefined;

function _render() {
	root.innerHTML = `<div class='log-page'>
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
								<span id='log-status'></span>
							</div>
							<span>Еще нет аккаунта? <button class='btn-path' id='reg'>Зарегистрироваться</button></span>
						</div>
					</div>`;
	let fadeBlock = document.querySelector(".log-content");
	let btnReg = document.getElementById("reg");
	let btnSendAuthInfo = document.getElementById("btnAuthInfo");
	error_span = document.getElementById("log-status");
	btnReg.addEventListener("click", router.pageReg);
	btnSendAuthInfo.addEventListener("click", _async_sendAuthInfo);
	fade(fadeBlock, 1, 0);
}

/*function _renderAuth(){
	let log_page = document.createElement("div");
	log_page.className = "log-page";
	let log_content = document.createElement("div");
	log_content.className = "log-content";
	let log = document.createElement("div");
	log.className = "log";
	
	let title = document.createElement("span");
	title.textContent = "Авторизация";
	log.appendChild(title);

	let input_fields = ["login", "password"];
	let input_fields_ru = ["Логин", "Пароль"];

	for (let i = 0; i < input_fields.length; i++) {
		let div_field = document.createElement("div");
		div_field.className = input_fields[i];

		let label = document.createElement("label");
		label.for = input_fields[i];
		label.textContent = input_fields_ru[i];

		let input = document.createElement("input");
		input.id = input_fields[i];
		input.className = "text";
		input.autocomplete = "off";
		if (input_fields[i] == "password"){
			input.type = input_fields[i];
		}

		let bar = document.createElement("span");
		bar.className = "bar";

		div_field.appendChild(label);
		div_field.appendChild(input);
		div_field.appendChild(bar);
		log.appendChild(div_field);
	}

	let btn_auth = document.createElement("button");
	btn_auth.className = "btn-submit";
	btn_auth.id = "btnAuthInfo";
	btn_auth.textContent = "Войти";

	let log_status = document.createElement("span");
	log_status.id = "log-status";

	log.appendChild(btn_auth);
	log.appendChild(log_status);

	log_content.appendChild(log);

	let btn_reg = document.createElement("button");
	btn_reg.className = "btn-path";
	btn_reg.id = "reg";
	btn_reg.textContent = "Зарегистрироваться";

	let span_reg = document.createElement("span");
	span_reg.textContent = "Еще нет аккаунта?";
	span_reg.appendChild(btn_reg);

	log_content.appendChild(span_reg);
	log_page.appendChild(log_content);
	root.appendChild(log_page);
}*/

function _getAuthInfo() {
	let login = document.getElementById("login").value;
	let password = document.getElementById("password").value;
	let jsonAuthInfo = {
		"login": login,
		"password": password
	}
	let user = new User(jsonAuthInfo);
	return user;
}

async function _async_sendAuthInfo() {
	let user = _getAuthInfo();
	if (!checkValid(user)) {
		error_span.textContent = "Не все поля были заполнены";
		return;
	}
	let response = await async_auth(user);
	let data = response.getBody();
	let status = response.getStatus();
	_react_authInfo(status, data);
}

function _react_authInfo(status, data) {
	switch (status) {
		case 401:
			error_span.textContent = "Неправильный логин или пароль";
			break;
		case 200:
			let token = data["token"];
			let body_token = token.split("\.")[1];
			let decoded_body = atob(body_token);
			let user_info = JSON.parse(decoded_body);
			let user_role = user_info["role"];
			localStorage.setItem("token", token);
			localStorage.setItem("login", user_info["login"]);

			switch (user_role) {
				case "client":
					router.pageMain();
					break;
				case "admin":
					router.pageAdmin();
					break;
			}
			break;
	}
}

export function renderPageAuth(_root) {
	root = _root;
	router = Router.getInstance();
	_render();
}