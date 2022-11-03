const animationHandler = (function (){
	function _Fade(elem, time, delay) {
		setTimeout(() => {
			elem.style.animation = "fade " + time + "s";
			elem.style.opacity = "1";
		}, delay);
	}

	function _Cover(elem, time, delay) {
		setTimeout(() => {
			elem.style.animation = "cover " + time + "s ease-in";
			elem.style.width = "100%";
		}, delay);
	}

	function _highlightMenu(buttons) {
		[].forEach.call(buttons, (elem) => {
			elem.addEventListener("click", () => {
				for (let i = 0; i < buttons.length; i++) {
					let style = window.getComputedStyle(buttons[i]);
					if (style["color"] != "rgb(17, 54, 40)") {
						buttons[i].style.animation = "rhighlightMenu 0.2s ease-in";
						buttons[i].style.color = "rgb(17, 54, 40)";
					}
				}
				elem.style.animation = "highlightMenu 0.2s ease-in";
				elem.style.color = "rgb(1, 175, 108)";
			});
		});
	}

	function _highlightRow(rows) {
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

	return {
		fade: _Fade,
		cover: _Cover,
		highlightMenu: _highlightMenu,
		highlightRow: _highlightRow,
	}
})();

export {animationHandler}