export function checkValid(object) {
	const fields = object.get();
	for (const key in fields) {
		if (!fields[key]) return false;
	}
	return true;
}

export function jsonToObjects(json, classConvert) {
	if (!Array.isArray(json)) {
		return new classConvert(json);
	}

	const res = [];
	json.forEach(obj => {
		const object = new classConvert(obj);
		res.push(object);
	});
	return res;
}