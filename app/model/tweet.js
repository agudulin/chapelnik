var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var TweetSchema = new Schema({
  id: Number,
  text: String,
  user: {
    screenName: String,
    name: String,
    profileImageUrl: String
  },
  createdAt: {
    type: Number,
    default: Date.now
  }
});

TweetSchema.path("id").required(true);
TweetSchema.path("text").required(true);
TweetSchema.path("user.screenName").required(true);
TweetSchema.path("user.name").required(true);
TweetSchema.path("user.profileImageUrl").required(true);

module.exports = mongoose.model("Tweet", TweetSchema);
