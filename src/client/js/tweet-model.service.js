(function(){

  angular
    .module("Chapelnik")
    .factory("TweetModel", TweetModel);

  TweetModel.$inject = ["$resource"];

  function TweetModel($resource) {
    var resource = $resource(
      "/favorites/:tweetId",
      { tweetId: "@_id" }
    );

    return resource;
  }

})();
