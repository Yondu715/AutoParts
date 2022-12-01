export function createHeader(){
	let header = document.createElement("header");
	let start = document.createElement("div");
	start.classList.add("start");
	let end = document.createElement("div");
	end.classList.add("end");

	let title = document.createElement("span");
	title.textContent = "AutoParts";
	let user = document.createElement("span");
	user.classList.add("user-login");
	let logout = document.createElement("button");
	logout.id = "btn-logout";
	logout.classList.add("btn-logout");

	start.appendChild(title);
	end.appendChild(user);
	end.appendChild(logout);
	header.appendChild(start);
	header.appendChild(end);
	return header;
}