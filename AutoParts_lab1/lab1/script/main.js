var rows = document.querySelectorAll("tr:not(:first-child)");
var data;
var input = document.getElementsByClassName("delete_btn");
var form = document.getElementById("form");

[].forEach.call(rows, function(elem){
	elem.addEventListener("click", function(){
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].style.background != ""){
				rows[i].style.background = ""
			}
		}
		elem.style.background = "rgb(192, 192, 192)";
		var cells = elem.getElementsByTagName("td");
		data = "name=" + cells[1].innerText
		+ "&cost=" + cells[2].innerText;
	})
});

function send_data() {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "delete");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(data);
	form.submit();
};
