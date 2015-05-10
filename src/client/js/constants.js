(function(){

  angular
    .module("Chapelnik")
    .constant("STREAM_SERVICE_URL", "http://localhost:3000")
    .constant("STREAM_STATUS", {
      initial: "Ready",
      beforeStreaming: "Getting new tweets...",
      streaming: "Streaming...",
      error: "Error: "
    });

})();
