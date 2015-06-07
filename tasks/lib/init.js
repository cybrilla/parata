var fs = require('fs'),
    path = require('path');

module.exports = function(value, options, logger, done) {
  var componentsDirectoryName = options.componentsDirectory,
      componentsDirectoryPath = path.join(process.cwd(), componentsDirectoryName);

  fs.mkdir(componentsDirectoryPath, function(err) {
    err ? logger.errorlns('['+err.code+'] Error creating components directory.')
        : logger.oklns('Components directory named `' + componentsDirectoryName + '` created successfully.');

    done();
  });
};
