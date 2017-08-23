var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");

var PORT = 3000;

app.use('/', require('./app/routing/htmlRoutes'));
app.use('/api', require('./app/routing/apiRoutes'));

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});