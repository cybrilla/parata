var fs = require('fs-extra'),
    path = require('path'),
    static = require('node-static');

module.exports = function(value, options, logger, done) {
  var fileServer = new static.Server(path.join(options.dest)),
      port = options.serverPort;

  logger.oklns("Server running at: http://localhost:" + port)
  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
  }).listen(port);
};
