var fs = require('fs'),
    path = require('path'),
    Handlebars = require('handlebars');

Handlebars.registerHelper('link', function(name) {
  var result;
  result = '<a href="'+name+'.html">'+name.toUpperCase()+'</a>';

  return new Handlebars.SafeString(result);
});

Handlebars.registerHelper('titleize', function(name) {
  return new Handlebars.SafeString(name.toUpperCase());
});

module.exports = {
  generateComponent: function(dest, templatePath, component) {
    var attributes = component.getAttributes(),
        contents = fs.readFileSync(templatePath, 'utf8');
        template = Handlebars.compile(contents),
        result = template(attributes);

    fs.writeFileSync(path.join(dest, attributes.name + '.html'), result);
  },

  generateIndex: function(dest, templatePath, components) {
    var contents = fs.readFileSync(templatePath, 'utf8'),
        template = Handlebars.compile(contents),
        result = template({
          components: components
        });

    fs.writeFileSync(path.join(dest, 'index.html'), result);
  }
};
