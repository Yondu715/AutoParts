import { dataAction, request } from "../../../../model/modelBundle.js";
import { animationHandler } from "../../../animationHandler.js";
import router from "../../../router.js";

export default (function () {
	let root = undefined;
	let products = undefined;

	function _getUserProducts() {
		request.get_userProducts(_getUserProducts_callback);
	}

	function _getUserProducts_callback(status, data) {
		if (status == 401) {
			router.pageStart(root);
		} else if (status == 200) {
			let productsJSON = JSON.parse(data);
			products = dataAction.convert(productsJSON);
			_render(products);
		}
	}

	function _render() {
		let div_products = document.createElement("div");
		div_products.id = "products";
		let btnPlace = document.createElement("div");
		btnPlace.id = "btn-place";

		let columns = ["id", "name", "date", "brand", "model", "cost", "imageBase64"];
		let table = dataAction.create_table(products, columns);
		let button = document.createElement("button");
		button.textContent = "Удалить";
		button.className = "btn-submit";
		button.addEventListener("click", _sendDeleteInfo);
		div_products.appendChild(table);
		btnPlace.appendChild(button);

		root.innerHTML = "";
		root.appendChild(div_products);
		root.appendChild(btnPlace);
		let rows = div_products.getElementsByTagName("tr");
		animationHandler.highlightRow(rows);
	}

	/* DELETE PRODUCT */

	function _getDeleteInfo() {
		let rows = document.getElementsByTagName("tr");
		let products_id = [];
		for (let i = 0; i < rows.length; i++) {
			if (rows[i].style.background != "") {
				let cell = rows[i].querySelector(".id");
				let product = {
					id: Number(cell.innerText)
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
		if (status == 401) {
			router.pageStart(root);
		} else if (status == 204) {
			_getUserProducts();
		}
	}

	function _init(_root) {
		root = _root;
		_getUserProducts();
	}

	return {
		render: _init,
	};

})();