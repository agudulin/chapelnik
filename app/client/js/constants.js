(function(){

  angular
    .module("Chapelnik")
    .constant("STREAM_SERVICE_URL", location.origin.replace(/^http/, "ws"))
    .constant("STREAM_STATUS", {
      initial: "Ready to stream (it stops after 30 seconds)",
      beforeStreaming: "Getting new tweets...",
      streaming: "Streaming...",
      error: "Error: "
    });

})();
