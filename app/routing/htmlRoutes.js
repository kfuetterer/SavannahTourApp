var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var html = express.Router();

html.use(bodyParser.json());
html.use(bodyParser.urlencoded({ extended: true }));
html.use(bodyParser.text());
html.use(bodyParser.json({ type: "application/vnd.api+json" }));

html.get("/", function(req, res) { 
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

html.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname,"../public/signup.html"));
});

html.get("/tour", function(req, res){
    res.sendFile(path.join(__dirname, "../public/tour.html"));
});

module.exports = html;