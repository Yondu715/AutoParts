export function template() {
	return `
		<div class='component-wrap'>
			<style>
				@import "style/general.css";
				@import "style/mainPage.css";
				@import "style/animations.css";
			</style>
			<span class='overPage'></span>
			<div class='main-page'>
				<ap-header></ap-header>
				<div id='wrap_content'>
					<ap-menu></ap-menu>
					<div id='content'>
						<ap-products class='component'></ap-products>
					</div>
				</div>
			</div>
		</div>`;
}