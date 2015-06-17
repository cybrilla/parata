var fs = require('fs-extra'),
    path = require('path'),
    actions = {
      init: require('./lib/init.js'),
      component: require('./lib/component.js'),
      serve: require('./lib/serve.js'),
      build: require('./lib/build.js')
    };

module.exports = function (grunt) {

  grunt.registerTask('sketchbox', 'css web components', function() {
    var options = this.options(),
        done = this.async();

    // Default options
    setDefaultOption(options, 'stylePreProcessor', 'scss');
    setDefaultOption(options, 'componentsDirectory', 'components');
    setDefaultOption(options, 'dest', 'dist');
    setDefaultOption(options, 'serverPort', '8888');
    setDefaultOption(options, 'componentTemplatePath', path.join(__dirname, '/../lib/templates/component.hbs'));
    setDefaultOption(options, 'indexTemplatePath', path.join(__dirname, '/../lib/templates/index.hbs'));

    this._defaultOptions = options;

    // Dispatch Action
    dispatch.apply(this, [ grunt, done ]);
  });
};

var setDefaultOption = function(baseObj, key, defaultValue) {
  baseObj[key] = typeof baseObj[key] === 'undefined' ? defaultValue : baseObj[key];
};

var dispatch = function(grunt, done) {
  var optionValue,
      availableOptions = Object.keys(actions),
      configOptions = this._defaultOptions,
      availableOption,
      i, length, action;

  for(i=0, length = availableOptions.length; i<length; i++) {
    availableOption = availableOptions[i];
    optionValue = grunt.option(availableOption);

    if(optionValue) {
      action = actions[availableOption];

      if(action) {
        action(optionValue, configOptions, grunt.log, done);
        return;
      }
    }
  }
};
