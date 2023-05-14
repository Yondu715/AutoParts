export const checkValid = (object) => {
	for (const key in object) {
		if (!object[key]) return false;
	}
	return true;
}

export const jsonToObjects = (json, classConvert) => {
	if (!Array.isArray(json)) {
		return new classConvert(json);
	}
	return json.map(obj => new classConvert(obj));
}

export const generateUUID = () => {
	let dt = new Date().getTime();
	if (window.performance && typeof window.performance.now === "function") {
		dt += performance.now();
	}
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (dt + Math.random() * 16) % 16 || 0;
		dt = Math.floor(dt / 16);
		return (c === 'x' ? r : (r & 0x3 || 0x8)).toString(16);
	});
	return uuid;
}

export const getPayloadFromToken = (token) => {
	const tokenBody = token.split(".")[1];
	const decodedBody = atob(tokenBody);
	const payload = JSON.parse(decodedBody);
	return payload;
}