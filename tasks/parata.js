var fs = require('fs-extra'),
    path = require('path'),
    build =  require('./lib/build.js');

module.exports = function (grunt) {

  grunt.registerTask('parata', 'css web components', function() {
    var options = this.options(),
        done = this.async(),
        styleFileExt,
        yoConfig;

    if(!fs.existsSync('.yo-rc.json')) {
      throw Error('`.yo-rc.json` doesn\'t seem to be present. Please use generator-parata https://github.com/cybrilla/generator-parata');
    }

    yoConfig = JSON.parse(fs.readFileSync('.yo-rc.json', 'utf8'))['generator-parata'];
    styleFileExt = yoConfig['cssPreProcessor'] === 'sass' ? 'scss' : yoConfig['cssPreProcessor'];

    // Default options
    setDefaultOption(options, 'styleFileExt', styleFileExt);
    setDefaultOption(options, 'componentsDirectory', yoConfig['componentsDir']);
    setDefaultOption(options, 'dest', yoConfig['dest']);
    setDefaultOption(options, 'serverPort', yoConfig['serverPort']);
    setDefaultOption(options, 'componentTemplatePath', path.join(__dirname, '/../lib/templates/component.hbs'));
    setDefaultOption(options, 'indexTemplatePath', path.join(__dirname, '/../lib/templates/index.hbs'));

    this._defaultOptions = options;

    build(options, grunt.log)
  });
};

var setDefaultOption = function(baseObj, key, defaultValue) {
  baseObj[key] = typeof baseObj[key] === 'undefined' ? defaultValue : baseObj[key];
};
