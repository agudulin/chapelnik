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
          tweet: "="
        },
        controller: TweetController,
        controllerAs: "vm",
        bindToController: true
      };

      return directive;
    }

    function TweetController() {
      var vm = this;

      vm.addToFavorites = addToFavorites;

      function addToFavorites(tweetItem) {
        console.log(tweetItem);
      }
    }
})();
