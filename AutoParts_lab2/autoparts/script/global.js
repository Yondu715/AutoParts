function sendRequest(type, uri, data, callback_func, useToken){
	var xhr = new XMLHttpRequest();
	xhr.open(type, uri, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	if (useToken == true) {
		xhr.setRequestHeader("Authorization", localStorage.getItem("login") + ";" + localStorage.getItem("password"))
	}
	xhr.send(JSON.stringify(data));
	xhr.onreadystatechange = callback_func;
}

function check_valid(data) {
	var keys = Object.keys(data);
	for (var i = 0; i < keys.length; i++) {
		if (data[keys[i]] == "") return false;
	}
	return true
}

function create_table(data, columns) {
	var table = document.createElement("table");
	for (var i = 0; i < data.length; i++) {
		var row = document.createElement("tr");
		for (var j = 0; j < columns.length; j++) {
			var cell = document.createElement("td");
			cell.textContent = data[i][columns[j]];
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	return table;
}