var fs = require('fs-extra'),
    path = require('path'),
    express = require('express'),
    app = express();

module.exports = function(value, options, logger, done) {
  var server;

  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/../views');
  app.use(express.static(path.join(process.cwd(), options.dest)));

  app.get('/test/:name', function (req, res) {
    var componentName = req.params.name,
        data = {
          example: fs.readFileSync(path.join(
            process.cwd(),
            options.componentsDirectory,
            componentName,
            'example.html'
          ), 'utf8')
        };

    res.render('component', data);
  });

  server = app.listen(options.serverPort, function () {

    var host = server.address().address,
        port = server.address().port;

    logger.oklns('Sketchbox listening at http://%s:%s', host, port);

  });
};
