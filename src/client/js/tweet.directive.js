(function() {

  angular
    .module("Chapelnik")
    .directive("chplnkTweet", tweet);

    function tweet() {
      var directive = {
        restric: "EA",
        templateUrl: "tweet.html",
        replace: true,
        transclude: true,
        scope: {
          tweetUserPhotoSrc: "@",
          tweetUserName: "@",
          tweetUserScreenname: "@",
          tweetText: "@"
        }
      };

      return directive;
    }
})();
