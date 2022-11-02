var pageMain = (function(){
	var root = undefined;
	var error_span = undefined;
	var products = undefined;

	function _render() {
		root.innerHTML = `<span class='overPage'></span>
					<div class='main-page'>
						<header>
							<div class='start'>
								<span>AutoParts</span>
							</div>
							<div class='end'>
								<span class='user-login'>Yondu</span>
								<button id='btn-logout' class='btn-logout'></button>
							</div>
						</header>
						<div class='wrap-content'>
							<div id='menu'></div>
							<div class='content'>
								<div id='main-content'></div> 
								<div id='btn-place'></div>
							</div>
						</div>
					</div>`
		_renderMenu();
		_getAllProducts();
		var userLogin = document.getElementsByClassName("user-login")[0];
		var btnLogout = document.getElementById("btn-logout");
		userLogin.textContent = localStorage.getItem("login");
		btnLogout.addEventListener("click", _logout);
	}

	function _logout() {
		var animationBlock = document.getElementsByClassName("overPage")[0];
		localStorage.removeItem("token");
		localStorage.removeItem("login");
		animationCover(animationBlock, 0.5, 0);
		setTimeout(function(){
			router.pageStart(root);
		}, 800);
	}

	/* RENDER MENU */

	function _renderMenu() {
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
		buttons[0].addEventListener("click", _getAllProducts);
		buttons[1].addEventListener("click", _renderSale);
		buttons[2].addEventListener("click", _getUserProducts);
		highlightMenu(buttons);
	}

	/* RENDER PRODUCT */

	function _getAllProducts() {
		model.get_allProducts(_getAllProducts_callback);
	}

	function _getAllProducts_callback(status, data){
		if (status == "Unauthorized") {
			router.pageStart(root);
		} else if (status == "OK") {
			var productsJSON = JSON.parse(data);
			var rez = [];
			for (var i = 0; i < productsJSON.length; i++) {
				var product = new model.product();
				product.set(productsJSON[i]);
				rez.push(product);
			}
			products = rez;
			_renderAllProducts();
		}
	}

	function _renderAllProducts(){
		var mainContent = document.getElementById("main-content");
		var btnPlace = document.getElementById("btn-place");
		btnPlace.innerHTML = "";
		mainContent.innerHTML = "";
		var columns = ["id", "name", "sellerName", "brand", "model", "cost"];
		var table = model.create_table(products, columns);
		mainContent.appendChild(table);
	}

	function _getUserProducts() {
		model.get_userProducts(_getUserProducts_callback);
	}

	function _getUserProducts_callback(status, data){
		if (status == "Unauthorized") {
			router.pageStart(root);
		} else if (status == "OK") {
			var productsJSON = JSON.parse(data);
			var rez = [];
			for (var i = 0; i < productsJSON.length; i++) {
				var product = new model.product();
				product.set(productsJSON[i]);
				rez.push(product);
			}
			products = rez;
			_renderUserProducts(products);
		}
	}

	function _renderUserProducts(){
		var mainContent = document.getElementById("main-content");
		var btnPlace = document.getElementById("btn-place");
		var columns = ["id", "name", "brand", "model", "cost"];
		var table = model.create_table(products, columns);
		var button = document.createElement("button");
		button.textContent = "Удалить";
		button.className = "btn-submit";
		button.addEventListener("click", _sendDeleteInfo);
		mainContent.innerHTML = "";
		btnPlace.innerHTML = "";
		mainContent.appendChild(table);
		btnPlace.appendChild(button);
		var rows = document.getElementsByTagName("tr");
		highlightRow(rows);
	}

	/* DELETE PRODUCT */

	function _getDeleteInfo() {
		var rows = document.getElementsByTagName("tr");
		var products_id = [];
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].style.background != "") {
				var cells = rows[i].getElementsByTagName("td");
				var product = {
					id: Number(cells[0].innerText)
				}
				products_id.push(product);
			}
		}
		return products_id;
	}

	function _sendDeleteInfo() {
		var jsonProductsID = _getDeleteInfo();
		model.deleteProduct(jsonProductsID, _sendDeleteInfo_callback);
	}

	function _sendDeleteInfo_callback(status){
		if (status == "Unauthorized") {
			router.pageStart(root);
		} else if (status == "No Content") {
			_getUserProducts();
		}
	}

	/* SALE PRODUCT */

	function _renderSale() {
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
			input.autocomplete = "off";
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
		button.addEventListener("click", _sendSaleInfo);
		btnPlace.appendChild(button);
		mainContent.appendChild(span);
		error_span = document.getElementById("sale-status");
	}

	function _getSaleInfo() {
		var jsonSale = {};
		var fields = ["name", "brand", "model", "cost"];
		for (var i = 0; i < fields.length; i++) {
			var value = document.getElementById(fields[i]).value;
			jsonSale[fields[i]] = value;
		}
		jsonSale["sellerName"] = localStorage.getItem("login");
		jsonSale["cost"] = Number(jsonSale["cost"]);
		var product = new model.product();
		product.set(jsonSale);
		return product;
	}

	function _sendSaleInfo() {
		var product = _getSaleInfo();
		if (model.check_valid(product)) {
			model.saleProduct(product, _sendSaleInfo_callback);
		} else {
			error_span.textContent = "Не все поля были заполнены";
		}
	}

	function _sendSaleInfo_callback(status){
		if (status == "Unauthorized") {
			router.pageStart(root);
			return;
		}
		error_span.textContent = "";
		var fields = document.getElementsByTagName("input");
		for (var i = 0; i < fields.length; i++) {
			fields[i].value = "";
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