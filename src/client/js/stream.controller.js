(function() {

  angular
    .module("Chapelnik")
    .controller("StreamController", StreamController);

  StreamController.$inject = ["socket", "STREAM_STATUS"];

  function StreamController(socket, STREAM_STATUS) {
    var vm = this;

    vm.keywords = ["eCommerce", "CRO"];
    vm.status = STREAM_STATUS.initial;
    vm.tweetList = [];
    vm.isStreamingEnabled = false;
    vm.toggleStream = toggleStream;

    socket.on("newTweet", function(data) {
      vm.status = STREAM_STATUS.streaming;
      vm.tweetList.unshift(data);
    });

    socket.on("err", function(data) {
      vm.status = STREAM_STATUS.error + data.error;
      vm.isStreamingEnabled = false;
    });

    socket.on("stop", function() {
      vm.status = STREAM_STATUS.initial;
      vm.isStreamingEnabled = false;
    });

    function toggleStream() {
      vm.isStreamingEnabled = !vm.isStreamingEnabled;

      if (vm.isStreamingEnabled) {
        vm.status = STREAM_STATUS.beforeStreaming;
        socket.emit("startStreaming", {
          query: vm.keywords.join(",") // think of commas as logical ORs
        });
      } else {
        vm.status = STREAM_STATUS.initial;
        socket.emit("stopStreaming", {});
      }
    }
  }

})();
