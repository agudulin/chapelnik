//
// load different configs for prod or dev
//
var path = require("path");

var configFile = "dev.js";

if (process.env.NODE_ENV === "production") {
  configFile = "prod.js";
}

module.exports = require.main.require(path.join("config", configFile));
