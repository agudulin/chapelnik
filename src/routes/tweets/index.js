var express = require("express");
var Twitter = require("twitter");

var config = require("../../config");
var Tweet = require("../../model/tweet");

var twitterClient = new Twitter(config.twitter);

var app = module.exports = express();

app.get("/favorites", getFavoriteTweets);
app.post("/favorites", addTweetToFavorites);
app.delete("/favorites/:id", removeTweetFromFavorites);

function getFavoriteTweets(req, res, next) {
  Tweet.find(function(err, favoriteTweets) {
    if (err) {
      return next(err);
    }
    res.send(favoriteTweets);
  });
}

  var tweet = req.body;
function addTweetToFavorites(req, res, next) {

  var tweetModel = new Tweet(tweet);
  tweetModel.save(function(err, favoriteTweets) {
    if (err) {
      return next(err);
    }
    res.send(favoriteTweets);
  });
}

function removeTweetFromFavorites(req, res, next) {
  var id = req.params.id;

  Tweet.findByIdAndRemove(id, function(err, removedTweet) {
    if (err) {
      return next(err);
    }
    res.send(removedTweet);
  });
}
