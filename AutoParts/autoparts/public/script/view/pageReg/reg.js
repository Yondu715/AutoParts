var pageReg = (function () {
	var root = undefined;
	var error_span = undefined;

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
		var fadeBlock = document.getElementsByClassName("log-content")[0];
		var btnAuth = document.getElementById("auth");
		var btnReg = document.getElementById("btnRegInfo");
		error_span = document.getElementById("log-status");
		btnAuth.addEventListener("click", function () {
			router.pageAuth(root);
		});
		btnReg.addEventListener("click", _sendRegInfo);
		animationFade(fadeBlock, 1, 0);
	}

	function _getRegInfo() {
		var login = document.getElementById("login").value
		var password = document.getElementById("password").value
		var repeat_password = document.getElementById("password-repeat").value
		var jsonRegInfo = {
			"login": login,
			"password": password,
			"repeat-password": repeat_password
		}
		return jsonRegInfo;
	}

	function _sendRegInfo() {
		var jsonRegInfo = _getRegInfo();
		if (model.check_valid(jsonRegInfo)) {
			if ((jsonRegInfo["password"] == jsonRegInfo["repeat-password"])) {
				model.reg(jsonRegInfo, _sendRI_callback);
			} else {
				error_span.textContent = "Пароли не совпадают";
			}
		} else {
			error_span.textContent = "Не все поля были заполнены";
		}
	}

	function _sendRI_callback(status) {
		if (status == "OK") {
			router.pageAuth(root);
		} else if (status == "Bad Request") {
			error_span.textContent = "Нельзя использовать данный логин";
		}
	}

	function _init(_root) {
		root = _root;
		_render();
	}

	return {
		render: _init,
	};
})();