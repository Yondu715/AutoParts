import { dataObject, dataAction, request } from "../../../model/modelBundel.js";
import router from "../../router.js";
import { animationHandler } from "../../animationHandler.js";

export default (function () {
	let root = undefined;
	let error_span = undefined;

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
		let fadeBlock = document.getElementsByClassName("log-content")[0];
		let btnReg = document.getElementById("reg");
		let btnSendAuthInfo = document.getElementById("btnAuthInfo");
		error_span = document.getElementById("log-status");
		btnReg.addEventListener("click", () => {
			router.pageReg(root);
		});
		btnSendAuthInfo.addEventListener("click", _sendAuthInfo);
		animationHandler.fade(fadeBlock, 1, 0);
	}

	function _getAuthInfo() {
		let login = document.getElementById("login").value
		let password = document.getElementById("password").value
		let jsonAuthInfo = {
			"login": login,
			"password": password
		}
		let user = new dataObject.user(jsonAuthInfo);
		return user;
	}

	function _sendAuthInfo() {
		let user = _getAuthInfo();
		if (dataAction.check_valid(user)) {
			request.auth(user, _sendAI_callback);
		} else {
			error_span.textContent = "Не все поля были заполнены";
		}
	}

	function _sendAI_callback(status, token) {
		if (status == "Unauthorized") {
			error_span.textContent = "Неправильный логин или пароль";
		} else if (status == "OK") {
			localStorage.setItem("token", token);
			localStorage.setItem("login", _getAuthInfo().get()["login"]);
			router.pageMain(root);
		}
	}

	function _init(_root) {
		root = _root;
		_render();
	}

	return {
		render: _init,
	};
})()