export function template() {
	return `
		<div class='component-wrap'>
			<style>
				@import "src/style/general.css";
				@import "src/style/adminPage.css";
				@import "src/style/animations.css";
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