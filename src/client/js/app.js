(function(){

  angular
    .module("Chapelnik", ["ngRoute"])
    .config(config);

  config.$inject = ["$locationProvider"];

  function config($locationProvider) {
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
  }

})();
