var path = require("path");

var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");
var errorhandler = require("errorhandler");
var methodOverride = require("method-override");
var morgan = require("morgan");

var routes = require("./routes");

// init express server
var server = express();

// setup express
server.use(morgan(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(compression());
server.use(methodOverride());

// use jade as default view engine
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "jade");

// use the public directory for static files
server.use(express.static(path.join(__dirname, "public"), {
  maxAge: 365 * 24 * 60 * 60
}));

if (server.get("env") === "development") {
  server.use(errorhandler());
}

server.get("/", routes.index);

server.set("port", process.env.PORT || 3000);
server.listen(server.get("port"), function() {
  console.log("Express server listening on port " + server.get("port"));
});

module.exports = server;
