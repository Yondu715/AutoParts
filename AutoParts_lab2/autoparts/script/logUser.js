var root = document.body;

function authRender() {
	root.innerHTML = "<div class='log-page'>" +
		"<div class='log-content'>" +
		"<div class='log'>" +
		"<span>Авторизация</span>" +
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
		"<button class='btn-submit' id='btnAuthInfo'>Войти</button>" +
		"<span id='log-status'></span>" +
		"</div>" +
		"<span>Еще нет аккаунта? <button class='btn-path' id='reg'>Зарегистрироваться</button></span>" +
		"</div>" +
		"</div>";
	var fadeBlock = document.getElementsByClassName("log-content")[0];
	var btnReg = document.getElementById("reg");
	var btnSendAuthInfo = document.getElementById("btnAuthInfo");
	btnReg.addEventListener("click", regRender);
	btnSendAuthInfo.addEventListener("click", sendAuthInfo);
	animationFade(fadeBlock, 1, 0);
}

function getAuthInfo() {
	var login = document.getElementById("login").value
	var password = document.getElementById("password").value
	var jsonAuthInfo = {
		"login": login,
		"password": password
	}
	return jsonAuthInfo;
}

function sendAuthInfo() {
	var jsonAuthInfo = getAuthInfo();
	var error_span = document.getElementById("log-status");
	if (check_valid(jsonAuthInfo)) {
		sendRequest("post", "api/users/login", jsonAuthInfo, function () {
			if (this.readyState != 4 | this.status != 200) {
				return;
			}
			var response = this.responseText;
			if (response == "Yes") {
				localStorage.setItem("login", jsonAuthInfo.login);
				localStorage.setItem("password", jsonAuthInfo.password);
				mainRender();
			} else {
				error_span.textContent = "Неправильный логин или пароль";
			}
		}, false);
	} else {
		error_span.textContent = "Не все поля были заполнены";
	}
}

var userStore = {
	"login": localStorage.getItem("login"),
	"password": localStorage.getItem("password")
}

sendRequest("post", "api/users/login", userStore, function(){
	if (this.readyState != 4 | this.status != 200) {
		return;
	}
	var response = this.responseText;
	if (response == "Yes") {
		mainRender();
	} else {
		authRender();
	}
}, false);



