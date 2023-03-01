export class Store {

	constructor() {
		this._callbacks = [];
	}

	_emit(state) {
		this._callbacks.forEach(callback => callback(state));
	}

	subscribe(callback) {
		this._callbacks.push(callback);
	}

}