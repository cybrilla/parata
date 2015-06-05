var fs = require('fs');

module.exports = function (grunt) {

  grunt.registerTask('sketchbox', 'css web components', function() {
    var done = this.async();
    parseOption.apply(this, [ grunt, done ]);
  });
};

var availableOptions = [ 'component' ];
var actions = {
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
          done();
        });
      });
    });
  }
}

var parseOption = function(grunt, done) {
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
      if(action) { break; }
    }
  }

  if(action) {
    action(optionValue, configOptions, grunt.log, done);
  }
};
