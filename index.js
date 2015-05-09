var http = require("http");
var app = require("./src/app");

var server = http.createServer(app);

// start the server
server.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
