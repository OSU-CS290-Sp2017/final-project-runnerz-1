var express = require("express");
var fs = require("fs");
var server = express();

var indexHTML = fs.readFileSync("./public/index.html", "utf8");
var calandarHTML = fs.readFileSync("./public/calandar.html", "utf8");
var picturesHTML = fs.readFileSync("./public/pictures.html", "utf8");
var officersHTML = fs.readFileSync("./public/officers.html", "utf8");
var indexJS = fs.readFileSync("./public/index.js", "utf8");
var styleCSS = fs.readFileSync("./public/style.css", "utf8");
var HTML404 = fs.readFileSync("./public/404.html", "utf8");

server.get("/*", function(req, res, next){
	if(req.url == "/")
	{
		res.status(200);
		res.end(indexHTML);
	}
	if(req.url == "/calandar")
	{
		res.status(200);
		res.end(calandarHTML);
	}
	if(req.url == "/pictures")
	{
		res.status(200);
		res.end(picturesHTML);
	}
	if(req.url == "/officers")
	{
		res.status(200);
		res.end(officersHTML);
	}
	if(req.url == "/style.css")
	{
		res.status(200);
		res.end(styleCSS);
	}
	if(req.url == "/index.js")
	{
		res.status(200);
		res.end(indexJS);
	}
	next();
});

server.get("*", function(req, res, next){
	res.status(404);
	res.end(HTML404);
});

server.listen(process.env.PORT || 3000, function(){
	console.log("Listening on port", process.env.PORT || 3000)
});