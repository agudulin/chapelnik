var socketIO = require("socket.io");

function Stream(server) {
  var io = socketIO.listen(server);

  io.sockets.on("connection", function(socket) {
    socket.emit("message", {"message": "hello world"});
  });
}

module.exports = Stream;
