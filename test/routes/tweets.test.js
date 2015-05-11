//
// XXX(agudulin):
//  it's better to run tests in test environment with own db or use mocks
//  but now it is running in developemnt env, so be sure that no enries left in the db after testing
//

var superagent = require("superagent");
var chai = require("chai");

var MOCK_TWEET = {
  id: 123,
  text: "140 symbols of foo bar",
  user: {
    screenName: "foobar",
    name: "Foo Bar",
    profileImageUrl: "http://example.com/foobar.png"
  }
};

describe("Chapelnik rest api server", function() {
  var favoriteTweet = null;

  it("post a new tweet", function(done) {
    superagent.post("http://localhost:3000/favorites")
      .send(MOCK_TWEET)
      .end(function(err, res) {
        favoriteTweet = res.body;

        chai.expect(err).to.eql(null);
        chai.expect(favoriteTweet).to.be.an("object");
        chai.expect(favoriteTweet).to.to.include.keys("id", "text", "user", "createdAt");
        chai.expect(favoriteTweet.user).to.to.include.keys("screenName", "name", "profileImageUrl");

        done();
      });
  });

  it("post an existing tweet", function(done) {
    superagent.post("http://localhost:3000/favorites")
      .send(MOCK_TWEET)
      .end(function(err, res) {
        var createdTweet = res.body;

        superagent.post("http://localhost:3000/favorites")
          .send(MOCK_TWEET)
          .end(function(err, res) {
            var updatedTweet = res.body;

            chai.expect(err).to.eql(null);
            chai.expect(createdTweet.id).to.eql(updatedTweet.id);
            chai.expect(createdTweet.text).to.eql(updatedTweet.text);
            chai.expect(createdTweet.user).to.eql(updatedTweet.user);
            chai.expect(createdTweet.createdAt).to.not.eql(updatedTweet.createdAt);

            done();
          });
      });
  });

  it("retrieves a collection of favorite tweets", function(done) {
    superagent.get("http://localhost:3000/favorites")
      .end(function(err, res) {
        var tweets = res.body;

        chai.expect(err).to.eql(null);
        chai.expect(tweets).to.be.an("array");
        chai.expect(tweets.length).to.eql(1);
        chai.expect(tweets[0]._id).to.eql(favoriteTweet._id);

        done();
      });
  });

  it("removes just added tweet", function(done) {
    superagent.del("http://localhost:3000/favorites/" + favoriteTweet._id)
      .end(function(err, res) {
        var removedTweet = res.body;

        chai.expect(err).to.eql(null);
        chai.expect(removedTweet).to.be.an("object");
        chai.expect(removedTweet._id).to.eql(favoriteTweet._id);

        done();
      });
  });

});
