export const checkValid = (object) => {
	const fields = object.get();
	for (const key in fields) {
		if (!fields[key]) return false;
	}
	return true;
}

export const jsonToObjects = (json, classConvert) => {
	if (!Array.isArray(json)) {
		return new classConvert(json);
	}
	return json.map(obj => new classConvert(obj));
}