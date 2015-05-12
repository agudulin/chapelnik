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
          tweet: "=",
          isFavorite: "@"
        },
        controller: TweetController,
        controllerAs: "vm",
        bindToController: true
      };

      return directive;
    }

    TweetController.$inject = ["TweetModel"];

    function TweetController(TweetModel) {
      var vm = this;

      vm.isProcessing = false;
      vm.toggleFavorites = toggleFavorites;

      function toggleFavorites(tweetItem) {
        vm.isProcessing = true;
        var tweetModel = new TweetModel();
        tweetModel = $.extend(tweetModel, tweetItem); // add tweet item properties to the model

        if (vm.isFavorite) {
          removeFromFavorites(tweetModel);
        } else {
          addToFavorites(tweetModel);
        }
      }

      function addToFavorites(tweetModel) {
        tweetModel.$save(function() {
          vm.isProcessing = false;
        });
      }

      function removeFromFavorites(tweetModel) {
        tweetModel.$remove(function() {
          // since we are using long polling to refresh a list of favorite tweets
          // we need some time to get a new list of tweets from the server when processing is finished
          // so let's don't change isProcessing value when the tweet is already removed
        });
      }
    }
})();
