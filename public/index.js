
function storeContact(name, email, callback)
{
	var postURL = "/addContact";
	var postRequest = new XMLHttpRequest();
	postRequest.open("POST", postURL);
	postRequest.setRequestHeader("Content-Type", "application/json");
	
	//Handle errors upon response
	postRequest.addEventListener('load', function (event) {
		var error;
		if (event.target.status !== 200) {
			error = event.target.response;
		}
		callback(error);
	});
	
	var postBody = {"name":name, "email":email};
	postRequest.send(JSON.stringify(postBody));
}

function handleContact()
{
	var nameInputBox = document.querySelector("#name-input");
	var nameInput = nameInputBox.value;
	var emailInputBox = document.querySelector("#email-input");
	var emailInput = emailInputBox.value;
	if(nameInput != "" && emailInput != "")
	{
		if(nameInput.includes(" "))
		{
			if(emailInput.includes(".") && emailInput.includes("@"))
			{
				storeContact(nameInput, emailInput, function (error) {
					if (error) {
						alert("Unable to save contact info.  Error:\n" + error);
					}
					else {
						nameInputBox.value = "";
						emailInputBox.value = "";
					}
				});
			}
			else
			{
				alert("Please enter valid email");
			}
		}
		else
		{
			alert("Please include first and last name");
		}
	}
	else
	{
		//Display "fields empty"
	}
}

window.addEventListener("DOMContentLoaded", function () {

	var contactButton = document.querySelector("#contact-button");
	contactButton.addEventListener('click', handleContact);
});