export function checkValid(object) {
	let fields = object.get();
	for (const key in fields) {
		if ((fields[key]) === "") return false;
	}
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