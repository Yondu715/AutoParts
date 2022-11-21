var root = document.body;

function regRender() {
	root.innerHTML = "<div class='log-page'>" +
		"<div class='log-content'>" +
		"<div class='log'>" +
		"<span>Регистрация</span>" +
		"<div class='login'>" +
		"<label for='login'>Логин</label>" +
		"<input id='login' class='text' type='text' autocomplete='off'>" +
		"<span class='bar'></span>" +
		"</div>" +
		"<div class='password'>" +
		"<label for='password'>Пароль</label>" +
		"<input id='password' class='text' type='password' autocomplete='off'>" +
		"<span class='bar'></span>" +
		"</div>" +
		"<div class='password'>" +
		"<label for='password-repeat'>Подтвердите пароль</label>" +
		"<input id='password-repeat' class='text' type='password' autocomplete='off'>" +
		"<span class='bar'></span>" +
		"</div>" +
		"<button class='btn-submit' id='btnRegInfo'>Зарегистрироваться</button>" +
		"<span id='log-status'></span>" +
		"</div>" +
		"<span>Уже есть аккаунт? <button class='btn-path' id='auth'>Авторизоваться</button></span>" +
		"</div>" +
		"</div>";
	var fadeBlock = document.getElementsByClassName("log-content")[0];
	var btnAuth = document.getElementById("auth");
	var btnReg = document.getElementById("btnRegInfo");
	btnAuth.addEventListener("click", authRender);
	btnReg.addEventListener("click", sendRegInfo);
	animationFade(fadeBlock, 1, 0);
}


function getRegInfo() {
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

function sendRegInfo() {
	var jsonRegInfo = getRegInfo();
	var error_span = document.getElementById("log-status");
	if (check_valid(jsonRegInfo)) {
		if ((jsonRegInfo["password"] != jsonRegInfo["repeat-password"])){
			error_span.textContent = "Пароли не совпадают";
			return;
		}
		sendRequest("post", "api/users/registr", jsonRegInfo, function () {
			if (this.readyState != 4 | this.status != 200) {
				return;
			}
			var response = this.responseText;
			if (response == "Yes") {
				authRender();
			} else {
				error_span.textContent = "Нельзя испольовать данный логин";
			}
		}, false);
	} else {
		error_span.textContent = "Не все поля были заполнены";
	}
}
