export function template(obj) {
	return `
		<style>
			@import "style/general.css";
			@import "style/animations.css";
		</style>
		<div class='header-wrap'>
			<div class='header'>
				<div class='start'>
					<span>${obj.title}</span>
				</div>
				<div class='end'>
					<span class='user-login'>${obj.username}</span>
					<button class='btn-logout'></button>
				</div>
			</div>
		</div>
	`;
}