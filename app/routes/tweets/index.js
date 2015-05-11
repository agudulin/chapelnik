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

function addTweetToFavorites(req, res, next) {
  var tweet = req.body;

  Tweet.find({ id: tweet.id }, function(err, favoriteTweets) {
    if (err) {
      return next(err);
    }

    if (favoriteTweets.length === 0) {
      Tweet.create(tweet, function(err, createdTweet) {
        if (err) {
          return next(err);
        }
        res.send(createdTweet);
      });
    } else {
      var existentTweet = favoriteTweets[0];
      Tweet.findByIdAndUpdate(existentTweet._id, { createdAt: Date.now() }, function(err, updatedTweet) {
        if (err) {
          return next(err);
        }
        res.send(updatedTweet);
      });
    }
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
