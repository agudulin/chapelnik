var express = require("express");
var Twitter = require("twitter");

var config = require("../../config");
var Tweet = require("../../model/tweet");

var twitterClient = new Twitter(config.twitter);

var app = module.exports = express();

app.get("/favorites", getFavoriteTweets);
app.post("/favorites", addTweetToFavorites);
app.delete("/favorites/:id", removeTweetFromFavorites);

function getFavoriteTweets(req, res) {
  Tweet.find(function(err, favoriteTweets) {
    if (err) {
      return res.status(500).send({ err: err });
    }
    res.send(favoriteTweets);
  });
}

function addTweetToFavorites(req, res) {
  var tweet = req.body;

  var tweetModel = new Tweet(tweet);
  tweetModel.save(function(err, favoriteTweets) {
    if (err) {
      return res.status(500).send({ err: err });
    }
    res.send(favoriteTweets);
  });
}

function removeTweetFromFavorites(req, res) {
  var id = req.params.id;

  Tweet.remove({ _id: id }, function(err) {
    if (err) {
      return res.status(500).send({ err: err });
    }
    res.send({ msg: "success" });
  });
}
