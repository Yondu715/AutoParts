import { check_valid } from "../../../../model/DataAction.js";
import { Router } from "../../../router.js";
import { fade } from "../../../AnimationHandler.js";
import { User } from "../../../../model/transport/User.js";
import { reg } from "../../../../model/Request.js";
import renderAuthComponent from "./auth.js";


let root = undefined;
let error_span = undefined;
let router = undefined;

function _render() {
	root.innerHTML = "";
	_renderReg();
	let fadeBlock = document.getElementsByClassName("log-content")[0];
	let btnAuth = document.getElementById("auth");
	let btnReg = document.getElementById("btnRegInfo");
	error_span = document.getElementById("log-status");
	btnAuth.addEventListener("click", () => {
		renderAuthComponent(root);
	});
	btnReg.addEventListener("click", _sendRegInfo);
	fade(fadeBlock, 1, 0);
}

function _renderReg(){
	let log = document.createElement("div");
	log.className = "log";

	let title = document.createElement("span");
	title.textContent = "Регистрация";

	log.appendChild(title);

	let input_fields = ["login", "password", "password-repeat"];
	let input_fields_ru = ["Логин", "Пароль", "Подтвердите пароль"];

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
		if (input_fields[i] != "login") {
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
	btn_auth.textContent = "Зарегистрироваться";

	let log_status = document.createElement("span");
	log_status.id = "log-status";

	log.appendChild(btn_auth);
	log.appendChild(log_status);

	let btn_reg = document.createElement("button");
	btn_reg.className = "btn-path";
	btn_reg.id = "reg";
	btn_reg.textContent = "Авторизоваться";

	let span_reg = document.createElement("span");
	span_reg.textContent = "Уже есть аккаунт? ";
	span_reg.appendChild(btn_reg);

	root.appendChild(log);
	root.appendChild(span_reg);
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

function _sendRegInfo() {
	let user = _getRegInfo();
	if (check_valid(user)) {
		if ((user.get()["password"] == user.get()["repeat-password"])) {
			reg(user, _sendRI_callback);
		} else {
			error_span.textContent = "Пароли не совпадают";
		}
	} else {
		error_span.textContent = "Не все поля были заполнены";
	}
}

function _sendRI_callback(status) {
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