var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var fs = require("fs");

var server = express();
server.engine("handlebars", exphbs({defaultLayout: "main"}));
server.set("view engine", "handlebars");

var officerData = require("./officerData");
var contactData = require("./contactData");
var announcements = require("./announcements");
var pictures = require("./pictures");

server.get("/*", function(req, res, next){
	if(req.url == "/")
	{
		var args = {"title": "OSU Running Club",
		"announcements": announcements};
		res.render("home", args);
	}
	else if(req.url == "/calendar")
	{
		var args = {"title": "OSU Running Club"};
		res.render("calendar", args);
	}
	else if(req.url == "/pictures")
	{
		var args = {"title": "OSU Running Club",
		"photo": pictures};
		res.render("pictures", args);
	}
	else if(req.url == "/officers")
	{
		var args = {"title": "OSU Running Club",
		"officers": officerData};
		res.render("officers", args);
	}
	else
	{
		next();
	}
});

server.use(bodyParser.json());

server.post("/addContact", function(req, res, next){
	var info = req.body;
	
	if(info && info.name && info.email)
	{
		var alreadyExists = false;
		for(var i = 0; i < contactData.length; i++)
		{
			if(contactData[i].name == info.name || contactData[i].email == info.email)
				alreadyExists = true;
		}
		
		if(!alreadyExists)
			contactData.push(info);
		
		fs.writeFile("./contactData.json", JSON.stringify(contactData, null, '\t'), function(err){
			if(err){
				res.status(500).send("Unable to save contact info to database.");
			}
			else{
				res.status(200).send();
			}
		});
	}
	else {
		res.status(400).send("Corrupted personal information recieved.");
	}
});


server.use(express.static("./public/"));


server.get("*", function(req, res, next){
	var args = {"title": "OSU Running Club (error 404)"};
	res.render("404page", args);
});


server.listen(process.env.PORT || 3000, function(){
	console.log("Listening on port", process.env.PORT || 3000)
});
