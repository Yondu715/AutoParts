export class Application{
	constructor(application){
		this.application = application;
	}

	set(application) {
		this.application = application;
	}

	get() {
		return this.application;
	}
}