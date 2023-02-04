
class Router {
	_root;
	_default;
	_paths = {
		"auth": "ap-page-auth",
		"reg": "ap-page-reg",
		"main": "ap-page-main",
		"admin": "ap-page-admin",
	}

	setRoot(root) {
		this._root = root;
	}

	setDefaultPath(start) {
		this._default = start;
	}

	go(url = "") {
		if (url === "") {
			url = this._default;
		}
		let view = this._paths[url];
		this._renderPage(view);
		history.pushState(null, null, url);
	}

	async _renderPage(component) {
		let componentParts = component.split("-");
		let first_part = componentParts[1];
		let second_part = componentParts[2].charAt(0).toUpperCase() + componentParts[2].slice(1);
		let component_name = first_part + second_part;
		await import(`../pages/${component_name}/component`);
		this._root.replaceChildren();
		let comp = document.createElement(component);
		this._root.appendChild(comp);
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