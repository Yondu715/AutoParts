import router from "./view/router.js";
import { request } from "./model/request.js";


request.auth(null, (status) => {
	let root = document.body;
	if (status == 401) {
		router.pageStart(root);
	} else if (status == 200) {
		router.pageMain(root);
	}
});
