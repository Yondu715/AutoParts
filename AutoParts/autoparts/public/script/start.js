window.onload = () => {
	request.auth(null, (status) => {
		let root = document.body;
		if (status == "Unauthorized") {
			router.pageStart(root);
		} else if (status == "OK") {
			router.pageMain(root);
		}
	});
}