(function() {

  angular
    .module("Chapelnik")
    .controller("FavoritesController", FavoritesController);

  FavoritesController.$inject = ["$timeout", "TweetModel"];

  function FavoritesController($timeout, TweetModel) {
    var vm = this;

    vm.isFirstTimeLoaded = false;
    startPolling();

    function startPolling() {
      TweetModel.query(function(tweetList) {
        vm.tweetList = tweetList;
        vm.isFirstTimeLoaded = true;
        $timeout(startPolling, 2 * 1000);
      });
    }
  }

})();
