export function template() {
	return `
		<div class='component-wrap'>
			<style>
				@import "style/general.css";
				@import "style/adminPage.css";
				@import "style/animations.css";
			</style>
			<span class='overPage'></span>
			<div class='main-page'>
				<ap-header></ap-header>
				<div id='wrap_content'>
					<ap-menu></ap-menu>
					<div id='content'>
						<ap-applications class='component'></ap-applications>
					</div>
				</div>
			</div>
		</div>`;
}