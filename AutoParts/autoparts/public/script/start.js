import router from "./view/router.js";
import { request } from "./model/request/request.js";


request.auth(null, (status) => {
	let root = document.body;
	if (status == "Unauthorized") {
		router.pageStart(root);
	} else if (status == "OK") {
		router.pageMain(root);
	}
});
