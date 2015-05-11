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

      vm.toggleFavorites = toggleFavorites;

      function toggleFavorites(tweetItem) {
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
          // success
        });
      }

      function removeFromFavorites(tweetModel) {
        tweetModel.$remove(function() {
          // success
        });
      }
    }
})();
