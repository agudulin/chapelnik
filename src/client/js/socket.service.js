(function(){

  angular
    .module("Chapelnik")
    .factory("socket", socket);

  socket.$inject = ["$rootScope", "STREAM_SERVICE_URL"];

  function socket($rootScope, STREAM_SERVICE_URL) {
    var streamSocket = io.connect(STREAM_SERVICE_URL);
    var service = {
      on: on,
      emit: emit
    };

    return service;

    function on(eventName, callback) {
      streamSocket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(streamSocket, args);
        });
      });
    }

    function emit(eventName, data, callback) {
      streamSocket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(streamSocket, args);
          }
        });
      });
    }
  }

})();
