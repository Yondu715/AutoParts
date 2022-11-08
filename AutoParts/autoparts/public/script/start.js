import { Router } from "./view/router.js";
import { auth } from "./model/Request.js";


auth(null, (status) => {
	let root = document.body;
	let router = new Router();
	if (status == 401) {
		router.pageStart(root);
	} else if (status == 200) {
		router.pageMain(root);
	}
});
