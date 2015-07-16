var fs = require('fs-extra'),
    path = require('path'),
    Parser = require('../../lib/parser.js'),
    template = require('../../lib/template.js');
    site = require('../../lib/site.js');

module.exports = function(value, options, logger) {
  var componentsDirectoryPath = path.join(process.cwd(), options.componentsDirectory),
      dest = path.join(process.cwd(), options.dest),
      components;
  var sites = generateSiteJS(options);
  components = getComponents(componentsDirectoryPath, options.stylePreProcessor, options.dest);
  generateComponentFile(components, dest, options.componentTemplatePath,sites);
  generateIndexFile(components, dest, options.indexTemplatePath);

  // TODO
  // Error handling
  logger.oklns('Successfully built components.');
};

var getComponents = function(srcPath, styleExt, dest) {
  var list = fs.readdirSync(srcPath),
      i, length,
      j, rlength,
      stat,
      parser,
      item,
      component,
      components = [];

  for(i=0, length=list.length; i<length; i++) {
    item = path.join(srcPath, list[i]);
    stat = fs.statSync(item);

    if(stat.isDirectory()) {
      parser = new Parser();
      parser.setStyleFilePath(path.join(item, 'style.' + styleExt))
            .setExampleFilePath(path.join(item, 'example.html'))
            .run();

      results = parser.getComponents();

      for(j=0, rlength=results.length; j<rlength; j++) {
        component = results[j];
        components.push(component);
      }
    }
  }

  return components;
};

var generateComponentFile = function(components, dest, templatePath,sites) {
  var i, length,
      component;
  for(i=0, length=components.length; i<length; i++) {
    component = components[i];
    template.generateComponent(dest, templatePath, component,sites);
  }
};

var generateIndexFile = function(_components, dest, templatePath) {
  var components = _components.map(function(c) { return c.attr.dump() });

  template.generateIndex(dest, templatePath, components);
};

var generateSiteJS = function(options) {
  return new site(options);
};
