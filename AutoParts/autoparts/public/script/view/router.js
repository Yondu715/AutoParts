import { renderPageAuth, renderPageReg, renderPageMain, renderPageAdmin } from "./pages/pages.js";

export class Router {
	static instance = null;

	constructor(_root){
		this.root = _root;
		this.pageStart = () => renderPageAuth(this.root);
		this.pageAuth = () => renderPageAuth(this.root);
		this.pageMain = () => renderPageMain(this.root);
		this.pageReg = () => renderPageReg(this.root);	
		this.pageAdmin = () => renderPageAdmin(this.root);
	}

	static getInstance(_root){
		if (this.instance == null){
			this.instance = new Router(_root);
		}
		return this.instance;
	}
}