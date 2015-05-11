//
// dev environment config
// no need to require this file directly, use `./app/config` instead
//

module.exports = {
  db: "mongodb://username:password@host:port/dbname",
  twitter: {
    consumer_key: "consumer_key",
    consumer_secret: "consumer_secret",
    access_token_key: "access_token_key",
    access_token_secret: "access_token_secret"
  }
};
