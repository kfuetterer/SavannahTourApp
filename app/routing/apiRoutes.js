var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");

var FriendsofTour = require("../models/FriendsofTour.js");
var Location = require("../models/Location.js");
var logger = require("morgan");
var mongoose = require("mongoose");

var api = express.Router();

var scores = [];
var finalScores = [];

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.text());
api.use(bodyParser.json({ type: "application/vnd.api+json" }));

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "203980Kj",
  database: "FriendFinder_DB"
});

connection.connect(function(err) { 
    if (err) throw err;
    console.log("Connected");
});

api.get("/friendsoftour", function(req, response) {
    connection.query("SELECT * FROM people", function (err, res) {
        response.json(res);
    })
});

api.get("/locations", function(req, response) {
    connection.query("SELECT * FROM people", function (err, res) {
        response.json(res);
    })
});

api.get("/results", function(req, response) {
    connection.query("SELECT * FROM people", function (err, res) {
    })
})

api.post("/new/location", function(req, res) {
    var newFriend = req.body;
    console.log(newFriend);

    connection.query("INSERT INTO people SET ?", { name:newFriend.name, photo:newFriend.photo, q1: newFriend.q1, q2: newFriend.q2, q3: newFriend.q3, q4: newFriend.q4, q5: newFriend.q5, q6: newFriend.q6, q7: newFriend.q7, q8: newFriend.q8, q9: newFriend.q9, q10: newFriend.q10}, function (err, res) { });
    res.json(newFriend);
});

module.exports = api;