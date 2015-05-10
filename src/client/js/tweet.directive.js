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

    TweetController.$inject = ["TweetModel"];

    function TweetController(TweetModel) {
      var vm = this;

      vm.addToFavorites = addToFavorites;

      function addToFavorites(tweetItem) {
        var tweetModel = new TweetModel();
        tweetModel = $.extend(tweetModel, tweetItem); // add tweet item properties to the model

        tweetModel.$save(function(savedItem) {
          // success
        });
      }
    }
})();
