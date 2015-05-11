(function(){

  angular
    .module("Chapelnik", ["ngRoute", "ngResource"])
    .config(config);

  config.$inject = ["$locationProvider"];

  function config($locationProvider) {
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
  }

})();
