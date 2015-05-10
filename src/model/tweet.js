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

module.exports = mongoose.model("Tweet", TweetSchema);
