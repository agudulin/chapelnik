(function(){

  angular
    .module("Chapelnik")
    .config(config);

  config.$inject = ["$routeProvider"];

  function config($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "stream.html",
        controller: "StreamController",
        controllerAs: "vm"
      })
      .otherwise({
        redirectTo: "/"
      });
  }

})();
