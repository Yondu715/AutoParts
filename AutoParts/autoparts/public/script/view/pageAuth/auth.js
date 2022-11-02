var pageAuth = (function () {
	var root = undefined;
	var error_span = undefined;

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
		var fadeBlock = document.getElementsByClassName("log-content")[0];
		var btnReg = document.getElementById("reg");
		var btnSendAuthInfo = document.getElementById("btnAuthInfo");
		error_span = document.getElementById("log-status");
		btnReg.addEventListener("click", function () {
			router.pageReg(root);
		});
		btnSendAuthInfo.addEventListener("click", _sendAuthInfo);
		animationFade(fadeBlock, 1, 0);
	}

	function _getAuthInfo() {
		var login = document.getElementById("login").value
		var password = document.getElementById("password").value
		var jsonAuthInfo = {
			"login": login,
			"password": password
		}
		var user = new model.user();
		user.set(jsonAuthInfo);
		return user;
	}

	function _sendAuthInfo() {
		var user = _getAuthInfo();
		if (model.check_valid(user)) {
			model.auth(user, _sendAI_callback);
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