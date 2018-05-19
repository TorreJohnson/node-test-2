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

// Delete link click
function addEventListenersToDeleteLinks() {
	let deleteLinks = document.getElementsByClassName("linkdeleteuser");
	for (let i = 0; i < deleteLinks.length; i++) {
		deleteLinks[i].addEventListener("click", e => {
			e.preventDefault();
			deleteUser(e.target.rel);
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
		table.innerHTML = tableContent;
		addEventListenersToUsernames();
		addEventListenersToDeleteLinks();
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
		let username = document.getElementById("inputUserName");
		let email = document.getElementById("inputUserEmail");
		let fullname = document.getElementById("inputUserFullName");
		let age = document.getElementById("inputUserAge");
		let location = document.getElementById("inputUserLocation");
		let gender = document.getElementById("inputUserGender");
		var newUser = {
			username: username.value,
			email: email.value,
			fullname: fullname.value,
			age: age.value,
			location: location.value,
			gender: gender.value
		};
		// POST user to database
		fetch("http://localhost:3000/users/adduser", {
			method: "POST",
			headers: {
				accept: "applicaton/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newUser)
		})
			.then(res => res.json())
			.then(res => {
				// Check for successful message response
				if (res.msg === "") {
					// Clear the form inputs
					for (field in newUser) {
						newUser[field] = "";
					}
					// Populate the table with the new data
					populateTable();
				} else {
					// If an error is returned, alert the user of the error
					alert(`Error: ${res.msg}`);
				}
			});
	} else {
		// If errorCount is more than 0, error out
		alert("Please fill in all fields");
		return false;
	}
}

// Delete user on link click
function deleteUser(id) {
	// Pop up a confirmation dialog
	let confirmation = confirm("Are you sure that you want to delete this user?");
	// Check and make sure that the user confirmed
	if (confirmation === true) {
		// If confirmation is true, delete the user
		fetch(`http://localhost:3000/users/deleteuser/${id}`, {
			method: "DELETE",
			headers: {
				accept: "application/json",
				"content-type": "application/json"
			}
		})
			.then(res => res.json())
			.then(res => {
				// Check for succesful response
				if (res.msg === "") {
				} else {
					alert(`Error: ${res.msg}`);
				}
				// Update the table
				populateTable();
			});
	} else {
		// If user does not confirm the delete, do nothing
		return false;
	}
}
