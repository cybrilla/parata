var fs = require('fs'),
    path = require('path'),
    Handlebars = require('handlebars');

module.exports = {
  generateComponent: function(dest, templatePath, component) {
    var attributes = component.getAttributes(),
        contents = fs.readFileSync(templatePath, 'utf8');
        template = Handlebars.compile(contents),
        result = template({
          name: attributes.name,
          example: attributes.example
        });

    fs.writeFileSync(path.join(dest, attributes.name + '.html'), result);
  },

  generateIndex: function() {

  }
};
