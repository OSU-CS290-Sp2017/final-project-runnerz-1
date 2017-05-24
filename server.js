var express = require("express");
var server = express();

server.get("/", function(req, res, next){
	
});

server.listen(process.env.PORT || 3000, function(){
	console.log("Listening on port", process.env.PORT || 3000)
});