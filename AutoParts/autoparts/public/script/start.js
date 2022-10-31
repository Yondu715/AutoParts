window.onload = function(){
	model.auth(null, function(status){
		var root = document.body;
		if (status == "Unauthorized") {
			router.pageStart(root);
		} else if (status == "OK") {
			router.pageMain(root);
		}
	});
}