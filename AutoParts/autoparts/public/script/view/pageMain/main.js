const pageMain = (function () {
	let root = undefined;
	let error_span = undefined;
	let products = undefined;

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
		let userLogin = document.getElementsByClassName("user-login")[0];
		let btnLogout = document.getElementById("btn-logout");
		userLogin.textContent = localStorage.getItem("login");
		btnLogout.addEventListener("click", _logout);
	}

	function _logout() {
		let animationBlock = document.getElementsByClassName("overPage")[0];
		localStorage.removeItem("token");
		localStorage.removeItem("login");
		animationCover(animationBlock, 0.5, 0);
		setTimeout(() => {
			router.pageStart(root);
		}, 800);
	}

	/* RENDER MENU */

	function _renderMenu() {
		let menu = document.getElementById("menu");
		let menu_items = ["Запчасти", "Продать", "Мои товары"];
		let list = document.createElement("ul");
		let buttons = [];
		for (let i = 0; i < menu_items.length; i++) {
			let row = document.createElement("li");
			let btn = document.createElement("button");
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
		request.get_allProducts(_getAllProducts_callback);
	}

	function _getAllProducts_callback(status, data) {
		if (status == "Unauthorized") {
			router.pageStart(root);
		} else if (status == "OK") {
			let productsJSON = JSON.parse(data);
			products = model.convert(productsJSON);
			_renderAllProducts();
		}
	}

	function _renderAllProducts() {
		let mainContent = document.getElementById("main-content");
		let btnPlace = document.getElementById("btn-place");
		btnPlace.innerHTML = "";
		mainContent.innerHTML = "";
		let columns = ["id", "name", "sellerName", "brand", "model", "cost"];
		let table = model.create_table(products, columns);
		mainContent.appendChild(table);
	}

	function _getUserProducts() {
		request.get_userProducts(_getUserProducts_callback);
	}

	function _getUserProducts_callback(status, data) {
		if (status == "Unauthorized") {
			router.pageStart(root);
		} else if (status == "OK") {
			let productsJSON = JSON.parse(data);
			products = model.convert(productsJSON);
			_renderUserProducts(products);
		}
	}

	function _renderUserProducts() {
		let mainContent = document.getElementById("main-content");
		let btnPlace = document.getElementById("btn-place");
		let columns = ["id", "name", "brand", "model", "cost"];
		let table = model.create_table(products, columns);
		let button = document.createElement("button");
		button.textContent = "Удалить";
		button.className = "btn-submit";
		button.addEventListener("click", _sendDeleteInfo);
		mainContent.innerHTML = "";
		btnPlace.innerHTML = "";
		mainContent.appendChild(table);
		btnPlace.appendChild(button);
		let rows = document.getElementsByTagName("tr");
		highlightRow(rows);
	}

	/* DELETE PRODUCT */

	function _getDeleteInfo() {
		let rows = document.getElementsByTagName("tr");
		let products_id = [];
		for (let i = 0; i < rows.length; i++) {
			if (rows[i].style.background != "") {
				let cells = rows[i].getElementsByTagName("td");
				let product = {
					id: Number(cells[0].innerText)
				}
				products_id.push(product);
			}
		}
		return products_id;
	}

	function _sendDeleteInfo() {
		let jsonProductsID = _getDeleteInfo();
		request.deleteProduct(jsonProductsID, _sendDeleteInfo_callback);
	}

	function _sendDeleteInfo_callback(status) {
		if (status == "Unauthorized") {
			router.pageStart(root);
		} else if (status == "No Content") {
			_getUserProducts();
		}
	}

	/* SALE PRODUCT */

	function _renderSale() {
		let mainContent = document.getElementById("main-content");
		let btnPlace = document.getElementById("btn-place");
		mainContent.innerHTML = "";
		btnPlace.innerHTML = "";
		let fields = ["name", "brand", "model", "cost"];
		let fields_ru = ["Название", "Марка", "Модель", "Стоимость"];
		for (let i = 0; i < fields.length; i++) {
			let container = document.createElement("div");
			let input = document.createElement("input");
			input.className = "text";
			input.id = fields[i];
			input.autocomplete = "off";
			let label = document.createElement("label");
			label.textContent = fields_ru[i] + ":";
			let span = document.createElement("span");
			span.className = "bar";
			container.className = fields[i];
			container.appendChild(label);
			container.appendChild(input);
			container.appendChild(span);
			mainContent.appendChild(container);
		}
		let button = document.createElement("button");
		let span = document.createElement("span");
		span.id = "sale-status";
		button.textContent = "Выставить на продажу";
		button.className = "btn-submit";
		button.addEventListener("click", _sendSaleInfo);
		btnPlace.appendChild(button);
		mainContent.appendChild(span);
		error_span = document.getElementById("sale-status");
	}

	function _getSaleInfo() {
		let jsonSale = {};
		let fields = ["name", "brand", "model", "cost"];
		for (let i = 0; i < fields.length; i++) {
			let value = document.getElementById(fields[i]).value;
			jsonSale[fields[i]] = value;
		}
		jsonSale["sellerName"] = localStorage.getItem("login");
		jsonSale["cost"] = Number(jsonSale["cost"]);
		let product = new dataObject.product(jsonSale);
		return product;
	}

	function _sendSaleInfo() {
		let product = _getSaleInfo();
		if (model.check_valid(product)) {
			request.saleProduct(product, _sendSaleInfo_callback);
		} else {
			error_span.textContent = "Не все поля были заполнены";
		}
	}

	function _sendSaleInfo_callback(status) {
		if (status == "Unauthorized") {
			router.pageStart(root);
			return;
		}
		error_span.textContent = "";
		let fields = document.getElementsByTagName("input");
		for (let i = 0; i < fields.length; i++) {
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