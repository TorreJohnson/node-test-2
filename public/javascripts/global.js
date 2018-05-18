// Userlist data array for filling in info box
var userListData = [];

// DOM Ready
// if (document.readyState === "complete") {
// 	//Populate the user table on initial load
// 	console.log("complete");
populateTable();
// }

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

// var xmlhttp = new XMLHttpRequest();
// var url = "myTutorials.txt";
//
// xmlhttp.onreadystatechange = function() {
// 	if (this.readyState == 4 && this.status == 200) {
// 		var myArr = JSON.parse(this.responseText);
// 		myFunction(myArr);
// 	}
// };
// xmlhttp.open("GET", url, true);
// xmlhttp.send();
//
// function myFunction(arr) {
// 	var out = "";
// 	var i;
// 	for (i = 0; i < arr.length; i++) {
// 		out += '<a href="' + arr[i].url + '">' + arr[i].display + "</a><br>";
// 	}
// 	document.getElementsByTagName("TBODY").innerHTML = out;
// }
