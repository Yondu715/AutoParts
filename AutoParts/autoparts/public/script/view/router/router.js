import { renderPageAuth, renderPageReg, renderPageMain, renderPageAdmin } from "../pages/pages.js";

class Router {
	_root;

	constructor() {
		this._pageAuth = () => renderPageAuth(this._root);
		this._pageMain = () => renderPageMain(this._root);
		this._pageReg = () => renderPageReg(this._root);
		this._pageAdmin = () => renderPageAdmin(this._root);
		this._paths = {
			"auth": this._pageAuth,
			"reg": this._pageReg,
			"main": this._pageMain,
			"admin": this._pageAdmin,
		}
	}

	setRoot(root) {
		this._root = root;
	}

	setDefaultPath(start){
		this._default = start;
	}

	go(url=""){
		if (url === ""){
			url = this._default;
		}
		this._paths[url]();
		history.pushState(null, null, url);
	}
}

export class RouterFactory {
	static _router = null;

	static _createInstance() {
		return new Router();
	}

	static createInstance() {
		if (RouterFactory._router === null) {
			RouterFactory._router = RouterFactory._createInstance();
		}
		return RouterFactory._router;
	}
}