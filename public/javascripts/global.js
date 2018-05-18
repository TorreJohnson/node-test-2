// Userlist data array for filling in info box
var userListData = [];

populateTable();

// FUNCTIONS

// Fill table with data
function populateTable() {
	// Empty content string
	var tableContent = "";
	// AJAX call for JSON
	var xmlhttp = new XMLHttpRequest();
	var url = "/users/userlist";

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var res = JSON.parse(this.responseText);
			formatResponseForTable(res);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	function formatResponseForTable(res) {
		for (var i = 0; i < res.length; i++) {
			tableContent += "<tr>";
			tableContent +=
				'<td><a href="#" class="linkshowuser" rel="' +
				res[i].username +
				'">' +
				res[i].username +
				"</a></td>";
			tableContent += "<td>" + res[i].email + "</td>";
			tableContent +=
				'<td><a href="#" class="linkdeleteuser" rel="' +
				res[i]._id +
				'">delete</a></td>';
			tableContent += "</tr>";
		}
		var table = document.getElementsByTagName("tbody")[0];
		table.innerHTML += tableContent;
	}
}
