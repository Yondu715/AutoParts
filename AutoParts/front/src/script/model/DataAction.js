export function checkValid(object) {
	let keys = Object.keys(object.get());
	keys.forEach(key => {
		if (object.get()[key] === "") return false;
	});
	return true;
}

export function jsonToObjects(json, classConvert) {
	if (!Array.isArray(json)) {
		let object = new classConvert(json);
		return object;
	}

	let res = [];
	json.forEach(obj => {
		let object = new classConvert(obj);
		res.push(object);
	});
	return res;
}