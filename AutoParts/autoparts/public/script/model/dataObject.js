var dataObject = (function () {
	function User() {
		this.user = {};
	}

	User.prototype.set = function (user) {
		this.user = user;
	}

	User.prototype.get = function () {
		return this.user;
	}

	function Product() {
		this.product = {};
	}

	Product.prototype.set = function (product) {
		this.product = product;
	}

	Product.prototype.get = function () {
		return this.product;
	}

	return {
		user: User,
		product: Product,
		
	}
})();