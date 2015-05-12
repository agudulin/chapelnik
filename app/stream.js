var socketIO = require("socket.io");
var Twitter = require("twitter");

var config = require("app/config");

function Stream(server) {
  var io = socketIO.listen(server);
  var twitterClient = new Twitter(config.twitter);

  var currentStream = null;

  io.sockets.on("connection", function(socket) {

    socket.on("startStreaming", function(data) {
      if (!data || !data.query) {
        socket.emit("err", { error: "Empty data query parameter" });
        return;
      }

      twitterClient.stream("statuses/filter", { track: data.query }, function(stream) {
        currentStream = stream;

        stream.on("data", function(tweet) {
          socket.emit("newTweet", {
            id: tweet.id,
            text: tweet.text,
            user: {
              screenName: tweet.user.screen_name,
              name: tweet.user.name,
              profileImageUrl: tweet.user.profile_image_url
            }
          });
        });

        stream.on("error", function(error) {
          socket.emit("err", error);
        });

        stream.on("end", function() {
          socket.emit("stop");
        });

        setTimeout(function(){
          stream.destroy();
        }, 30 * 1000);
      });
    });

    socket.on("stopStreaming", function() {
      if (currentStream) {
        currentStream.destroy();
        currentStream = null;
      }
    });
  });
}

module.exports = Stream;
