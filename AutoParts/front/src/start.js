import { RouterFactory } from "./script/view/router/router.js";
import { RequestManagerFactory } from "./script/model/RequestManager.js";


let root = document.body;
let router = RouterFactory.createInstance();
router.setRoot(root);
router.setDefaultPath("auth");

let requestManager = RequestManagerFactory.createInstance();
let response = await requestManager.async_auth();
let status = response.getStatus();


switch (status) {
	case 401:
		router.go();
		break;
	case 200:
		let body_token = localStorage.getItem("token").split("\.")[1];
		let decoded_body = atob(body_token);
		let user_info = JSON.parse(decoded_body);
		let user_role = user_info["role"];

		switch (user_role) {
			case "client":
				router.go("main");
				break;
			case "admin":
				router.go("admin");
				break;
		}
		break;
}
