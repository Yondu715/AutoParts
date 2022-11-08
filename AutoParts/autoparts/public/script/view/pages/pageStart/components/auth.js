import { check_valid } from "../../../../model/DataAction.js";
import { Router } from "../../../router.js";
import { fade } from "../../../AnimationHandler.js";
import { User } from "../../../../model/transport/User.js";
import { auth } from "../../../../model/Request.js";
import renderRegComponent from "./reg.js";

let root = undefined;
let error_span = undefined;
let router = undefined;

function _render() {
	root.innerHTML = "";
	_renderAuth();
	let fadeBlock = root;
	let btnReg = document.getElementById("reg");
	let btnSendAuthInfo = document.getElementById("btnAuthInfo");
	error_span = document.getElementById("log-status");
	btnReg.addEventListener("click", () => {
		renderRegComponent(root);
	});
	btnSendAuthInfo.addEventListener("click", _sendAuthInfo);
	fade(fadeBlock, 1, 0);
}

function _renderAuth() {
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
		if (input_fields[i] == "password") {
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

	

	let btn_reg = document.createElement("button");
	btn_reg.className = "btn-path";
	btn_reg.id = "reg";
	btn_reg.textContent = "Зарегистрироваться";

	let span_reg = document.createElement("span");
	span_reg.textContent = "Еще нет аккаунта? ";
	span_reg.appendChild(btn_reg);
	
	root.appendChild(log);
	root.appendChild(span_reg);
}

function _getAuthInfo() {
	let login = document.getElementById("login").value
	let password = document.getElementById("password").value
	let jsonAuthInfo = {
		"login": login,
		"password": password
	}
	let user = new User(jsonAuthInfo);
	return user;
}

function _sendAuthInfo() {
	let user = _getAuthInfo();
	if (check_valid(user)) {
		auth(user.get(), _sendAI_callback);
	} else {
		error_span.textContent = "Не все поля были заполнены";
	}
}

function _sendAI_callback(status, token) {
	if (status == 401) {
		error_span.textContent = "Неправильный логин или пароль";
	} else if (status == 200) {
		localStorage.setItem("token", token);
		localStorage.setItem("login", _getAuthInfo().get()["login"]);
		router.pageMain(root);
	}
}

export default function _init(_root) {
	root = _root;
	router = new Router();
	_render();
}