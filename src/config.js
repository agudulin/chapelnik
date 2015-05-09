//
// load different configs for prod or dev
//

var configFile = "dev.js";

if (process.env.NODE_ENV === "production") {
  configFile = "prod.js";
}

module.exports = require("../config/" + configFile);
