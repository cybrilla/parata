var fs = require('fs-extra'),
    path = require('path'),
    express = require('express'),
    parser = require('../../lib/parser.js'),
    hbs = require('hbs'),
    Component = require('../../lib/component.js'),
    app = express();

module.exports = function(value, options, logger, done) {
  var server;

  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/../views');
  app.use(express.static(path.join(process.cwd(), options.dest)));

  app.get('/test/:name', function (req, res) {
    var componentName = req.params.name,
      
        // Read style file
        styleFile = path.join(
          process.cwd(),
          options.componentsDirectory,
          componentName,
          'style.' + options.stylePreProcessor
        ),

        // Read example file
        exampleFile = path.join(
          process.cwd(),
          options.componentsDirectory,
          componentName,
          'example.html'
        ),

        parsedComponents,

        // Data for template
        data;

        parser.styleFilePath = styleFile;
        parser.exampleFilePath = exampleFile;
        parsedComponents = parser.parseCommentBlock();

        for(var i=0, length=parsedComponents.length; i<length; i++) {
          var examples = [],
              component = new Component(parsedComponents[i]),
              template;

          parsedComponents[i].examples = component.getExamples();
        }

    data = {
      components: parsedComponents
    };
    res.render('test_component', data);
  });

  server = app.listen(options.serverPort, function () {

    var host = server.address().address,
        port = server.address().port;

    logger.oklns('Sketchbox listening at http://%s:%s', host, port);

  });
};
