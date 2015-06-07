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

      logger.oklns('Style file for`' + value + '` created successfully.')
      createExampleFile(newComponentPath, 'html', function() {
        logger.oklns('Example file for`' + value + '` created successfully.')
        done();
      });
    });
  });
};

var createStyleFile = function(componentPath, extension, callback) {
  var styleFilePath = path.join(componentPath, 'style.' + extension),
      contents = fs.readFileSync(path.join(__dirname, '../templates/component/style.tpl'), 'utf8');

  fs.writeFile(styleFilePath, contents, function(err) {
    callback(err);
  });
};

var createExampleFile = function(componentPath, extension, callback) {
  var exampleFilePath = path.join(componentPath, 'example.' + extension),
      contents = fs.readFileSync(path.join(__dirname, '../templates/component/example.html'), 'utf8');

  fs.writeFile(exampleFilePath, contents, function(err) {
    callback();
  });
};
