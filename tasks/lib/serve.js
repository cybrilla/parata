var fs = require('fs-extra'),
    path = require('path'),
    express = require('express'),
    parser = require('../../lib/parser.js'),
    hbs = require('hbs'),
    app = express();

module.exports = function(value, options, logger, done) {
  var server;

  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/../views');
  app.use(express.static(path.join(process.cwd(), options.dest)));

  app.get('/test/:name', function (req, res) {
    var componentName = req.params.name,
      
        // Read style file
        styleFile = fs.readFileSync(path.join(
          process.cwd(),
          options.componentsDirectory,
          componentName,
          'style.' + options.stylePreProcessor
        ), 'utf8'),

        // Read example file
        exampleFile = fs.readFileSync(path.join(
          process.cwd(),
          options.componentsDirectory,
          componentName,
          'example.html'
        ), 'utf8'),
        
        parsedComponents = parser.parseCommentBlock(styleFile, exampleFile),

        // Data for template
        data;

        for(var i=0, length=parsedComponents.length; i<length; i++) {
          var examples = [],
              component = parsedComponents[i],
              template;

          if(component.classNames.length > 0) {
            for(var j=0, elength=component.classNames.length; j<elength; j++) {
              template = hbs.compile(component.example[i]);
              examples.push(template({
                className: component.classNames[j]
              }));
            }
          }
          else {
            examples.push(component.example);
          }

          parsedComponents[i].examples = examples;
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
