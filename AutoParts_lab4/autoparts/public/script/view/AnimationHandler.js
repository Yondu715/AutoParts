export function fade(elem, time, delay) {
	setTimeout(() => {
		elem.style.animation = "fade " + time + "s";
		elem.style.opacity = "1";
	}, delay);
}

export function cover(elem, time, delay) {
	setTimeout(() => {
		elem.style.animation = "cover " + time + "s ease-in";
		elem.style.width = "100%";
	}, delay);
}

export function highlightMenu(buttons) {
	[].forEach.call(buttons, (elem) => {
		elem.addEventListener("click", () => {
			for (let i = 0; i < buttons.length; i++) {
				let style = window.getComputedStyle(buttons[i]);
				if (style["color"] != "rgb(17, 54, 40)") {
					buttons[i].style.animation = "rhighlightMenu 0.1s ease-in";
					buttons[i].style.color = "rgb(17, 54, 40)";
				}
			}
			elem.style.animation = "highlightMenu 0.1s ease-in";
			elem.style.color = "rgb(1, 175, 108)";
		});
	});
}

export function highlightRow(rows) {
	[].forEach.call(rows, (elem) => {
		elem.addEventListener("click", () => {
			if (elem.style.background == "") {
				elem.style.background = "rgb(209, 255, 223)";
			} else {
				elem.style.background = "";
			}
		});
	});
}