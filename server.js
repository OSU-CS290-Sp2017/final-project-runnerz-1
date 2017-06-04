var express = require("express");
var exphbs = require("express-handlebars");
var fs = require("fs");

var server = express();
server.engine("handlebars", exphbs({defaultLayout: "main"}));
server.set("view engine", "handlebars");

var officerData = require("./officerData");

/*var indexHTML = fs.readFileSync("./public/index.html", "utf8");
var calendarHTML = fs.readFileSync("./public/calendar.html", "utf8");
var picturesHTML = fs.readFileSync("./public/pictures.html", "utf8");
var officersHTML = fs.readFileSync("./public/officers.html", "utf8");
var indexJS = fs.readFileSync("./public/index.js", "utf8");
var styleCSS = fs.readFileSync("./public/style.css", "utf8");
var HTML404 = fs.readFileSync("./public/404.html", "utf8");*/

server.get("/*", function(req, res, next){
	if(req.url == "/")
	{
		var args = {"title": "OSU Running Club"};
		res.render("home", args);
	}
	else if(req.url == "/calendar")
	{
		var args = {"title": "OSU Running Club"};
		res.render("calendar", args);
	}
	else if(req.url == "/pictures")
	{
		var args = {"title": "OSU Running Club"};
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

server.use(express.static("./public/"));

server.get("*", function(req, res, next){
	var args = {"title": "OSU Running Club (error 404)"};
	res.render("404page", args);
});

server.listen(process.env.PORT || 3000, function(){
	console.log("Listening on port", process.env.PORT || 3000)
});