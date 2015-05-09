var path = require("path");

var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");
var errorhandler = require("errorhandler");
var methodOverride = require("method-override");
var morgan = require("morgan");
var mongoose = require("mongoose");

var config = require("./config");
var routes = {
  index: require("./routes/index"),
  tweets: require("./routes/tweets")
};

// connect to mongo db
mongoose.connect(config.db);
mongoose.connection.on("error", function() {
  console.error("MongoDB Connection Error. Make sure that MongoDB is running.");
});

// init express server
var server = express();

// setup express
server.use(morgan(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(compression());
server.use(methodOverride());

// use the public directory for static files
server.use(express.static(path.join(__dirname, "public"), {
  maxAge: 365 * 24 * 60 * 60
}));

if (server.get("env") === "development") {
  server.use(errorhandler());
}

// setup routes
server.use(routes.index);
server.use(routes.tweets);

server.set("port", process.env.PORT || 3000);
server.listen(server.get("port"), function() {
  console.log("Express server listening on port " + server.get("port"));
});

module.exports = server;
