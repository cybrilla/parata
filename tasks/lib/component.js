var fs = require('fs'),
    path = require('path');

module.exports = function(value, options, logger, done) {
  var componentsDirectoryName = options.componentsDirectory,
      componentsDirectoryPath = path.join(process.cwd(), componentsDirectoryName),
      stylePreProcessor = options.stylePreProcessor,
      newComponentPath = path.join(componentsDirectoryPath, value);

  fs.mkdir(newComponentPath, function(err) {
    err ? logger.errorlns('['+err.code+'] Error creating component named `' + value + '` directory.')
        : logger.oklns('Component directory named `' + value + '` created successfully.');

    if(err) { done(); return; }

    createStyleFile(newComponentPath, stylePreProcessor, function(err) {
      if(err) { done(); return; }

      createExampleFile(newComponentPath, 'html', done);
    });
  });
};

var createStyleFile = function(componentPath, extension, callback) {
  var styleFilePath = path.join(componentPath, 'style.' + extension);

  fs.writeFile(styleFilePath, "HELLO!", function(err) {
    callback(err);
  });
};

var createExampleFile = function(componentPath, extension, done) {
  var exampleFilePath = path.join(componentPath, 'example.' + extension);
  fs.writeFile(exampleFilePath, "HELLO!", function(err) {
    done();
  });
};
