import { renderPageAuth, renderPageReg, renderPageMain, renderPageAdmin } from "../pages/pages.js";

class Router {
	_root;

	constructor() {
		this.pageStart = () => renderPageAuth(this._root);
		this.pageAuth = () => renderPageAuth(this._root);
		this.pageMain = () => renderPageMain(this._root);
		this.pageReg = () => renderPageReg(this._root);
		this.pageAdmin = () => renderPageAdmin(this._root);
	}

	setRoot(root) {
		this._root = root;
	}

	go(url){
		
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