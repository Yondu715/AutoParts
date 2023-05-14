export class Product {
	#id;
	#name;
	#sellerName;
	#model;
	#brand;
	#price;
	#date;
	#image;

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