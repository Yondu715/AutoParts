export function template() {
	let componentWrap = document.createElement("div");
	componentWrap.classList.add("component-wrap");
	componentWrap.innerHTML = `
		<style>
			@import "public/style/general.css";
			@import "public/style/mainPage.css";
			@import "public/style/animations.css";
		</style>
		<span class='overPage'></span>
		<div class='main-page'>
			<div id='wrap_content'></div>
		</div>`;
	return componentWrap;
}