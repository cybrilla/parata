var fs = require('fs-extra'),
    parser = require('../../lib/parser.js'),
    Component = require('../../lib/component.js'),
    hbs = require('hbs'),
    path = require('path');

module.exports = function(value, options, logger, done) {
  var componentsDirectoryName = options.componentsDirectory,
      componentsDirectoryPath = path.join(process.cwd(), componentsDirectoryName),
      dest = path.join(process.cwd(), options.dest);

  // Clean files in dest
  cleanDestFiles(dest, options.stylePreProcessor);

  // Create a component htmls
  createComponentFiles(componentsDirectoryPath, options.stylePreProcessor, dest, function() {
    done();
  });
};

var cleanDestFiles = function(dest, styleExtname) {
  var destFiles = fs.readdirSync(dest),
      destfile,
      i, length;
  
  for(i=0, length=destFiles.length; i<length; i++) {
    destfile = path.join(dest, destFiles[i]);
    if(path.extname(destfile) === '.' + styleExtname || path.extname(destfile) === '.html') {
      fs.remove(destfile);
    }
  }

};

var createComponentFiles = function(componentsDirectoryPath, stylePreProcessor, dest, callback) {
  var component,
      componentPath,
      stat,
      styleFile,
      exampleFile,
      parsedComponents,
      i, length,
      j, elength;

  fs.readdir(componentsDirectoryPath, function(err, files) {
    var examples,
        template,
        templateContents;

    for(i=0, length=files.length; i<length; i++) {
      componentPath = path.join(componentsDirectoryPath, files[i]);
      stat = fs.statSync(componentPath);
      if(stat.isDirectory()) {
        styleFile = path.join(componentPath, 'style.' + stylePreProcessor);
        exampleFile = path.join(componentPath, 'example.html');

        parser.styleFilePath = styleFile;
        parser.exampleFilePath = exampleFile;
        parsedComponents = parser.parseCommentBlock();

        for(j=0, elength=parsedComponents.length; j<elength; j++) {
          examples = [];
          component = new Component(parsedComponents[j]);

          parsedComponents[j].examples = component.getExamples();
        }

        templateContents = fs.readFileSync(path.join(__dirname, '/../views/component.hbs'), 'utf8');
        template = hbs.compile(templateContents);

        fs.writeFileSync(path.join(dest, files[i]) + '.html', template({
          components: parsedComponents, name: path.basename(componentPath) 
        }));
      }
    }

    callback();
  });
};
