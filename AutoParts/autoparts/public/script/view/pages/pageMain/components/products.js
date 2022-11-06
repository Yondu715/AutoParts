import { dataAction, request } from "../../../../model/modelBundle.js";
import router from "../../../router.js";

export default (function () {
	let root = undefined;
	let products = undefined;

	/* RENDER PRODUCT */

	function _getAllProducts() {
		request.get_allProducts(_getAllProducts_callback);
	}

	function _getAllProducts_callback(status, data) {
		if (status == 401) {
			router.pageStart(root);
		} else if (status == 200) {
			let productsJSON = JSON.parse(data);
			products = dataAction.convert(productsJSON);
			_render();
		}
	}

	function _render() {
		let div_products = document.createElement("div");
		div_products.id = "products";
		root.innerHTML = "";
		let columns = ["id", "name", "sellerName", "date", "brand", "model", "cost", "imageBase64"];
		let table = dataAction.create_table(products, columns);
		div_products.appendChild(table);
		root.appendChild(div_products);
	}

	function _init(_root) {
		root = _root;
		_getAllProducts();
	}

	return {
		render: _init,
	};

})();