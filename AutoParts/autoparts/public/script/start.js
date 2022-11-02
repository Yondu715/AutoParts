window.onload = function(){
	request.auth(null, function(status){
		var root = document.body;
		if (status == "Unauthorized") {
			router.pageStart(root);
		} else if (status == "OK") {
			router.pageMain(root);
		}
	});
}