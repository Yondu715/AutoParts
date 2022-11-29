import { renderPageAuth, renderPageReg, renderPageMain, renderPageAdmin } from "./pages/pages.js";

export class Router {

	constructor(){
		this.pageStart = renderPageAuth;
		this.pageAuth = renderPageAuth;
		this.pageMain = renderPageMain;
		this.pageReg = renderPageReg;	
		this.pageAdmin = renderPageAdmin;
	}
}