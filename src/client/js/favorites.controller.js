(function() {

  angular
    .module("Chapelnik")
    .controller("FavoritesController", FavoritesController);

  FavoritesController.$inject = ["$timeout", "TweetModel"];

  function FavoritesController($timeout, TweetModel) {
    var vm = this;

    startPolling();

    function startPolling() {
      TweetModel.query(function(tweetList){
        vm.tweetList = tweetList;
        $timeout(startPolling, 1000);
      });
    }
  }

})();
