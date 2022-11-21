var root = document.body;

function mainRender() {
	root.innerHTML ="<span class='overPage'></span>"+
					"<div class='main-page'>" +
						"<header>" +
							"<div class='start'>" +
								"<span>AutoParts</span>" +
							"</div>" +
							"<div class='end'>" +
								"<span class='user-login'>Yondu</span>" +
								"<button id='btn-logout' class='btn-logout'></button>" +
							"</div>" +
						"</header>" +
						"<div class='wrap-content'>" +
							"<div id='menu'></div>" +
							"<div class='content'>" +
								"<div id='main-content'></div>" + 
								"<div id='btn-place'></div>" +
							"</div>" +
						"</div>" +
					"</div>"
	renderMenu();
	renderAllProducts();
	var userLogin = document.getElementsByClassName("user-login")[0];
	var btnLogout = document.getElementById("btn-logout");
	userLogin.textContent = localStorage.getItem("login");
	btnLogout.addEventListener("click", logout);
}

function logout() {
	var animationBlock = document.getElementsByClassName("overPage")[0];
	localStorage.removeItem("login");
	localStorage.removeItem("password");
	animationCover(animationBlock, 0.5, 0);
	setTimeout(authRender, 800);
}

/* RENDER MENU */

function renderMenu(){
	var menu = document.getElementById("menu");
	var menu_items = ["Запчасти", "Продать", "Мои товары"];
	var list = document.createElement("ul");
	var buttons = [];
	for (var i = 0; i < menu_items.length; i++) {
		var row = document.createElement("li");
		var btn = document.createElement("button");
		btn.textContent = menu_items[i];
		row.appendChild(btn);
		buttons.push(btn);
		list.appendChild(row);
	}
	menu.appendChild(list);
	buttons[0].addEventListener("click", renderAllProducts);
	buttons[1].addEventListener("click", renderSale);
	buttons[2].addEventListener("click", renderUserProducts);
	highlightMenu(buttons);
}

/* RENDER PRODUCT */

function renderAllProducts(){
	sendRequest("get", "api/products/", null, function(){
		if (this.readyState != 4 | this.status != 200) {
			return;
		}
		if (this.responseText == "No access"){
			authRender();
			return;
		} 
		var products = JSON.parse(this.responseText);
		var mainContent = document.getElementById("main-content");
		var btnPlace = document.getElementById("btn-place");
		btnPlace.innerHTML = "";
		mainContent.innerHTML = "";
		var columns = ["id", "name", "sellerName", "brand", "model", "cost"];
		var table = create_table(products, columns);
		mainContent.appendChild(table);
	}, true);
}

function renderUserProducts() {
	var jsonLogin = {
		"login": localStorage.getItem("login")
	}
	sendRequest("get", "api/products/userProduct", jsonLogin, function () {
		if (this.readyState != 4 | this.status != 200) {
			return;
		}
		if (this.responseText == "No access") {
			authRender();
			return;
		} 
		var products = JSON.parse(this.responseText);
		var mainContent = document.getElementById("main-content");
		var btnPlace = document.getElementById("btn-place");
		var columns = ["id", "name", "brand", "model", "cost"];
		var table = create_table(products, columns);
		var button = document.createElement("button");
		button.textContent = "Удалить";
		button.className = "btn-submit";
		button.addEventListener("click", sendDeleteInfo);
		mainContent.innerHTML = "";
		btnPlace.innerHTML = "";
		mainContent.appendChild(table);
		btnPlace.appendChild(button);
		var rows = document.getElementsByTagName("tr");
		highlightRow(rows);
	}, true);
}

/* DELETE PRODUCT */

function getDeleteInfo(){
	var rows = document.getElementsByTagName("tr");
	var products_id = [];
	for (var i = 0; i < rows.length; i++) {
		if (rows[i].style.background != ""){
			var cells = rows[i].getElementsByTagName("td");
			var product = {
				id: Number(cells[0].innerText)
			}
			products_id.push(product);
		}
	}
	return products_id;
}

function sendDeleteInfo(){
	var jsonProductsID = getDeleteInfo();
	sendRequest("post", "api/products/removal", jsonProductsID, function(){
		if (this.readyState != 4 | this.status != 200) {
			return;
		}
		if (this.responseText == "No access") {
			authRender();
			return;
		} 
		renderUserProducts();
	}, true);
}

/* SALE PRODUCT */

function renderSale() {
	var mainContent = document.getElementById("main-content");
	var btnPlace = document.getElementById("btn-place");
	mainContent.innerHTML = "";
	btnPlace.innerHTML = "";
	var fields = ["name", "brand", "model", "cost"];
	var fields_ru = ["Название", "Марка", "Модель", "Стоимость"];
	for (var i = 0; i < fields.length; i++) {
		var container = document.createElement("div");
		var input = document.createElement("input");
		input.className = "text";
		input.id = fields[i];
		var label = document.createElement("label");
		label.textContent = fields_ru[i] + ":";
		var span = document.createElement("span");
		span.className = "bar";
		container.className = fields[i];
		container.appendChild(label);
		container.appendChild(input);
		container.appendChild(span);
		mainContent.appendChild(container);
	}
	var button = document.createElement("button");
	var span = document.createElement("span");
	span.id = "sale-status";
	button.textContent = "Выставить на продажу";
	button.className = "btn-submit";
	button.addEventListener("click", sendSaleInfo);
	btnPlace.appendChild(button);
	mainContent.appendChild(span);
}

function getSaleInfo(){
	var jsonSale = {};
	var fields = ["name", "brand", "model", "cost"];
	for (var i = 0; i < fields.length; i++){
		var value = document.getElementById(fields[i]).value;
		jsonSale[fields[i]] = value;
	}
	jsonSale["sellerName"] = localStorage.getItem("login");
	jsonSale["cost"] = Number(jsonSale["cost"]);
	return jsonSale;
}

function sendSaleInfo(){
	var jsonSale = getSaleInfo();
	var error_span = document.getElementById("sale-status");
	if (check_valid(jsonSale)){
		var fields = Object.keys(jsonSale);
		fields.splice(fields.length-1, 1);
		for (var i = 0; i < fields.length; i++) {
			document.getElementById(fields[i]).value = "";
		}
		error_span.textContent = "";
		sendRequest("post", "api/products/sale", jsonSale, function(){
			if (this.readyState != 4 | this.status != 200) {
				return;
			}
			if (this.responseText == "No access") {
				authRender();
				return;
			} 
		}, true);
	} else {
		error_span.textContent = "Не все поля были заполнены";
	}
}