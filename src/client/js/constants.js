(function(){

  angular
    .module("Chapelnik")
    .constant("STREAM_SERVICE_URL", window.STREAM_SERVICE_URL)
    .constant("STREAM_STATUS", {
      initial: "Ready to stream (it stops after 20 seconds)",
      beforeStreaming: "Getting new tweets...",
      streaming: "Streaming...",
      error: "Error: "
    });

})();
