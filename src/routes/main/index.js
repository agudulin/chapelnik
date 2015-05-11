var express = require("express");

var bundles = require("../../../bundle.result.json");

var app = module.exports = express();
var port = process.env.PORT || 3000;

// view engine setup
app.set("views", __dirname);
app.set("view engine", "hjs");

app.get("/", function(req, res) {
  res.render("main", {
    bundle: bundles,
    STREAM_SERVICE_URL: "//localhost:" + port
  });
});
