var fs = require('fs'),
    express = require('express'),
    server = express();

module.exports = function (grunt) {

  grunt.registerTask('sketchbox', 'css web components', function() {
    var done = this.async();

    dispatch.apply(this, [ grunt, done ]);
  });
};

var actions = {

  // Generate a new component
  component: function(name, configOptions, logger, done) {
    var filepath = __dirname + '/../../components/' + name,
        stypePreProcessor = configOptions.stylePreProcessor;

    fs.mkdir(filepath, function(err) {
      if(err) { console.log(err); return; }

      logger.oklns("Component named `" + name + "` created.")

      fs.writeFile(filepath + '/style.' + stypePreProcessor, fs.readFileSync(__dirname + '/templates/component/style.tpl', 'utf8'), function(err) {
        if(err) { console.log(err); return; }

        logger.oklns("Style file for `" + name + "` created.")

        fs.writeFile(filepath + '/example.html', fs.readFileSync(__dirname + '/templates/component/example.html'), function(err) {
          logger.oklns("Example file for `" + name + "` created.")

          // Done Callback
          done();
        });
      });
    });
  },

  // Serve all components
  serve: function(name, configOptions, logger, done) {
    server.get('/', function (req, res) {
      res.send('Hello World!');
    });

    server.listen(9000, function() {
       var host = this.address().address,
           port = this.address().port;

      logger.oklns('Sketchbox listening at http://%s:%s', host, port);
    });
  }
};

var availableOptions = Object.keys(actions);

var dispatch = function(grunt, done) {
  var i,
      length,
      availableOption,
      optionValue,
      action,
      configOptions = this.options(),
      option = grunt.option;

  for(i=0, length = availableOptions.length; i<length; i++) {
    availableOption = availableOptions[i];
    optionValue = option(availableOption);

    if(optionValue) {
      action = actions[availableOption];

      if(action) {
        action(optionValue, configOptions, grunt.log, done);
        return;
      }
    }
  }

};
