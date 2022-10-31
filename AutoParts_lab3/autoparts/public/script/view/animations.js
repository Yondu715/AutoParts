function animationFade(elem, time, delay){
	setTimeout(function(){
		elem.style.animation = "fade " + time + "s";
		elem.style.opacity = "1";
	}, delay);
}

function animationCover(elem, time, delay) {
	setTimeout(function () {
		elem.style.animation = "cover " + time + "s ease-in";
		elem.style.width = "100%";
	}, delay);
}

function highlightMenu(buttons){
	[].forEach.call(buttons, function(elem){
		elem.addEventListener("click", function () {
			for (var i = 0; i < buttons.length; i++){
				var style = window.getComputedStyle(buttons[i]);
				if (style["color"] != "rgb(17, 54, 40)"){
					buttons[i].style.animation = "rhighlightMenu 0.2s ease-in";
					buttons[i].style.color = "rgb(17, 54, 40)";
				}
			}
			elem.style.animation = "highlightMenu 0.2s ease-in";
			elem.style.color = "rgb(1, 175, 108)";
		});
	});
}

function highlightRow(rows){
	[].forEach.call(rows, function(elem){
		elem.addEventListener("click", function(){
			if (elem.style.background == ""){
				elem.style.background = "rgb(209, 255, 223)";
			} else {
				elem.style.background = "";
			}
		});
	});
}