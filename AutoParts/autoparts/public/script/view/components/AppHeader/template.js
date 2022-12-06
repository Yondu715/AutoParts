export function template(obj) {
	let headerWrap = document.createElement("div");
	headerWrap.classList.add("header-wrap");
	headerWrap.innerHTML = `
		<style>
			@import "public/style/general.css";
			@import "public/style/animations.css";
		</style>
	`;

	let header = document.createElement("div");
	header.classList.add("header");
	let start = document.createElement("div");
	start.classList.add("start");
	let end = document.createElement("div");
	end.classList.add("end");

	let title = document.createElement("span");
	title.textContent = obj.title;

	let username = document.createElement("span");
	username.classList.add("user-login");
	username.textContent = obj.username;

	let btnLogout = document.createElement("button");
	btnLogout.classList.add("btn-logout");

	start.appendChild(title);
	end.appendChild(username);
	end.appendChild(btnLogout);
	header.appendChild(start);
	header.appendChild(end);

	headerWrap.appendChild(header);
	return headerWrap;
}