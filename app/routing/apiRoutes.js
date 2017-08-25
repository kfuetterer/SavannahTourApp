var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var FriendsofTour = require("../models/FriendsofTour.js");
var Location = require("../models/Location.js");
var logger = require("morgan");
var mongoose = require("mongoose");

var api = express.Router();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.text());
api.use(bodyParser.json({ type: "application/vnd.api+json" }));

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/SavannahTourApp");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

api.get("/friendsoftour", function(req, response) {
    db.FriendsofTour.find({}, function (err, friendsoftour) {
        if (err) return handleError(err);
    });
});

api.get("/locations", function(req, response) {
    db.Location.find({}, function (err, locations) {
        if (err) return handleError(err);
    });
});

api.post("/new/location", function(req, res) {
    var newLocation = req.body;
    console.log(newLocation);

    connection.query("INSERT INTO Location SET ?", { name:newLocation.name, type:newLocation.type, map:newLocation.map, address:newLocation.address, description:newLocation.description, image:newLocation.image, pos:newLocation.pos}, function (err, res) { });
    res.json(newLocation);
});

module.exports = api;