class AnimationHandler {
	fade(elem, time, delay) {
		setTimeout(() => {
			elem.style.animation = "fade " + time + "s";
			elem.style.opacity = "1";
		}, delay);
	}
	
	cover(elem, time, delay) {
		setTimeout(() => {
			elem.style.animation = "cover " + time + "s ease-in";
			elem.style.width = "100%";
		}, delay);
	}
	
	highlightMenu(buttons) {
		[].forEach.call(buttons, (button) => {
			button.addEventListener("click", () => {
				for (let i = 0; i < buttons.length; i++) {
					let style = window.getComputedStyle(buttons[i]);
					if (style["color"] != "rgb(17, 54, 40)") {
						buttons[i].style.animation = "rhighlightMenu 0.1s ease-in";
						buttons[i].style.color = "rgb(17, 54, 40)";
					}
				}
				button.style.animation = "highlightMenu 0.1s ease-in";
				button.style.color = "rgb(1, 175, 108)";
			});
		});
	}
	
	highlightRows(rows) {
		[].forEach.call(rows, (row) => {
			row.addEventListener("click", () => {
				if (row.style.background == "") {
					row.style.background = "rgb(209, 255, 223)";
				} else {
					row.style.background = "";
				}
			});
		});
	}
}

export class AnimationHandlerFactory {
	static createInstance(){
		return new AnimationHandler();
	}
}
