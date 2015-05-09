var express = require("express");
var Twitter = require("twitter");

var config = require("../../config");
var twitterClient = new Twitter(config.twitter);

var app = module.exports = express();

app.get("/tweets", function(req, res) {
  twitterClient.get("search/tweets", {q: "eCommerce CRO"}, function(error, tweets, response) {
    res.send(tweets);
  });
});
