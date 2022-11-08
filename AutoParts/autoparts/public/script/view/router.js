import { pageAuth, pageStart, pageReg, pageMain } from "./pages/pages.js";

export class Router {

	constructor(){
		this.pageStart = pageAuth;
		this.pageAuth = pageAuth;
		this.pageMain = pageMain;
		this.pageReg = pageReg;	
	}
}