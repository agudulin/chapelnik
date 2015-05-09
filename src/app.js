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
  tweets: require("./routes/tweets")
};

// connect to mongo db
mongoose.connect(config.db);
mongoose.connection.on("error", function() {
  console.error("MongoDB Connection Error. Make sure that MongoDB is running.");
});

// init express app
var app = express();

// setup express
app.use(morgan(app.get("env") === "production" ? "combined" : "dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(methodOverride());

// use the public directory for static files
app.use(express.static(path.join(__dirname, "..", "public"), {
  maxAge: 365 * 24 * 60 * 60
}));

if (app.get("env") === "development") {
  app.use(errorhandler());
}

// setup routes
app.use(routes.tweets);

app.set("port", process.env.PORT || 3000);

module.exports = app;
