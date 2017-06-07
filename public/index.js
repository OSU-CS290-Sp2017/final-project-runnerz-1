
function storeContact(name, email)
{
	var postURL = "/addContact";
	var postRequest = new XMLHttpRequest();
	postRequest.open("POST", postURL);
	postRequest.setRequestHeader("Content-Type", "application/json");
	var postBody = {"name":name, "email":email};
	postRequest.send(JSON.stringify(postBody));	
}

function handleContact()
{
	var nameInput = document.querySelector("#name-input");
	var emailInput = document.querySelector("#email-input");
	if(nameInput.value != "" && emailInput.value != "")
	{
		storeContact(nameInput.value, emailInput.value);
		nameInput.value = "";
		emailInput.value = "";
	}
}

window.addEventListener("DOMContentLoaded", function () {

	var contactButton = document.querySelector("#contact-button");
	contactButton.addEventListener('click', handleContact);
});