var fs = require('fs'),
    path = require('path');

module.exports = function(value, options, logger, done) {
  var componentsDirectoryName = options.componentsDirectory,
      componentsDirectoryPath = path.join(process.cwd(), componentsDirectoryName);

  fs.mkdir(componentsDirectoryPath, function(err) {
    err ? logger.errorlns('['+err.code+'] Error creating components directory.')
        : logger.oklns('Components directory named `' + componentsDirectoryName + '` created successfully.');

    if(err) { done(); return; }

    createStyleBootstrapFile(componentsDirectoryPath, options.stylePreProcessor, function(err) {
      if(err) { done(); return; }

      logger.oklns('Style bootstrap file called `app.' + options.stylePreProcessor + '` created successfully.')
      done();
    });
  });
};

var createStyleBootstrapFile = function(componentsDirectoryPath, extension, callback) {
  fs.writeFile(path.join(componentsDirectoryPath, 'app.' + extension), '/**\n  * Bootstrap file for all styles\n  */', function(err) {
    callback(err);
  });
};
