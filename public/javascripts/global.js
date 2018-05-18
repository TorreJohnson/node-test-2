// Userlist data array for filling in info box
var userListData = [];

document.addEventListener("DOMContentLoaded", e => {
	console.log("DOM fully loaded");
	populateTable();
	document.getElementById("btnAddUser").addEventListener("click", e => {
		e.preventDefault();
		addUser();
	});
});

// Username link click
function addEventListenersToUsernames() {
	var links = document.getElementsByClassName("linkshowuser");
	for (var i = 0; i < links.length; i++) {
		links[i].addEventListener("click", e => {
			e.preventDefault();
			showUserInfo(e);
		});
	}
}

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

	// For each item in our JSON, add a table row and cells to the content string
	function formatResponseForTable(res) {
		userListData = res;
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
		// Inject the whole content string into our existing HTML table
		var table = document.getElementsByTagName("tbody")[0];
		table.innerHTML += tableContent;
		addEventListenersToUsernames();
	}
}

// Show User Info
function showUserInfo(e) {
	// Retrieve username from link rel attribute
	var thisUserName = e.target.rel;
	// Get index of object based on id value
	var arrayPosition = userListData
		.map(arrayItem => arrayItem.username)
		.indexOf(thisUserName);
	// Get our User Object
	var thisUserObject = userListData[arrayPosition];
	// Populate Info Box
	document.getElementById("userInfoName").innerText += thisUserObject.fullname;
	document.getElementById("userInfoAge").innerText += thisUserObject.age;
	document.getElementById("userInfoGender").innerText += thisUserObject.gender;
	document.getElementById("userInfoLocation").innerText +=
		thisUserObject.location;
}

// Add User
function addUser(e) {
	// Basic validation - increase errorCount variable if any fields are blank
	var errorCount = 0;
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].value === "") {
			errorCount++;
		}
	}
	// Check and make sure errorCount is still at zero
	if (errorCount === 0) {
		// If it is, compile all user info into one object
		var newUser = {
			username: document.getElementById("inputUserName").value,
			email: document.getElementById("inputUserEmail").value,
			fullname: document.getElementById("inputUserFullName").value,
			age: document.getElementById("inputUserAge").value,
			location: document.getElementById("inputUserLocation").value,
			gender: document.getElementById("inputUserGender").value
		};
		console.log(newUser);
	}
}
