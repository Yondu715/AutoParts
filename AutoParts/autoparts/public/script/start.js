import { Router } from "./view/router.js";
import { async_auth } from "./model/Request.js";


let response = await async_auth();
let status = response.getStatus();

let root = document.body;
let router = new Router();
if (status == 401) {
	router.pageStart(root);
} else if (status == 200) {
	let body_token = localStorage.getItem("token").split("\.")[1];
	let decoded_body = atob(body_token);
	let user_info = JSON.parse(decoded_body);
	let user_role = user_info["role"];

	switch (user_role) {
		case "client": {
				router.pageMain(root);
				break;
			}
		case "admin": {
				router.pageAdmin(root);
				break;
			}
		default:
			break;
	}
}
