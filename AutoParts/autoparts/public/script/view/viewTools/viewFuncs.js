export function showImage(input, image_place) {
	let file = input.files[0];
	let reader = new FileReader();
	reader.onload = () => {
		image_place.src = reader.result;
	}
	reader.readAsDataURL(file);
}

export function dragAndDrop(dropArea, input, image_place) {
	["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
		dropArea.addEventListener(eventName, (event) => {
			event.preventDefault();
			event.stopPropagation();
		});
	});

	["dragenter", "dragover"].forEach(eventName => {
		dropArea.addEventListener(eventName, (event) => {
			dropArea.classList.add("highlight");
		});
	});

	["dragleave", "drop"].forEach(eventName => {
		dropArea.addEventListener(eventName, (event) => {
			dropArea.classList.remove("highlight");
		});
	});

	dropArea.addEventListener("drop", (event) => {
		let dt = event.dataTransfer;
		let files = dt.files;
		input.files = files;
		showImage(input, image_place);
	});

}