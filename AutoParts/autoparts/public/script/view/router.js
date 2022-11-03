import { pageAuth, pageReg, pageMain } from "./pages/pages.js";

export default (function () {
	return {
		pageStart: pageAuth.render,
		pageAuth: pageAuth.render,
		pageReg: pageReg.render,
		pageMain: pageMain.render,
	}
})();