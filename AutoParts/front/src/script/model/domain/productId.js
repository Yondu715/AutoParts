import { Store } from "./store.js";

class IdProduct extends Store {

	constructor() {
		super();
		this._id = "";
	}

	getValue() {
		return this._id;
	}

	setValue(id) {
		this._id = id;
		super._emit(this._id);
	}

}

export class IdProductFactory {

	static _idProduct = null;

	static _createInstance() {
		return new IdProduct();
	}

	static createInstance() {
		if (IdProductFactory._idProduct === null) {
			IdProductFactory._idProduct = IdProductFactory._createInstance();
		}
		return IdProductFactory._idProduct;
	}
}