const dataObject = (function () {

	class User {
		
		constructor(user) {
			this.user = user;
		}

		set(user) {
			this.user = user;
		}

		get() {
			return this.user;
		}
	}

	class Product {

		constructor(product) {
			this.product = product;
		}

		set(product) {
			this.product = product;
		}

		get() {
			return this.product;
		}
	}

	return {
		user: User,
		product: Product,
	}
})();