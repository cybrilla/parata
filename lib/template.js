var fs = require('fs'),
    path = require('path'),
    Handlebars = require('handlebars');

/**
 *  Handlebars Helpers
 */

/**
 *  `link` helper
 *  Eg.:
 *  {{link button}} => <a href="button.hrml">BUTTON</a>
 */
Handlebars.registerHelper('link', function(name) {
  var result;
  result = '<a href="'+name+'.html">'+name.toUpperCase()+'</a>';

  return new Handlebars.SafeString(result);
});

/**
 *  `titleize` helper
 *  Eg.:
 *  {{titleize hello}} => HELLO
 *
 *  TODO
 *  Should titlecase it instead of upcasing.
 */
Handlebars.registerHelper('titleize', function(name) {
  return new Handlebars.SafeString(name.toUpperCase());
});

/**
 *  Template
 */
module.exports = {

  /**
   *  @method generateComponent
   *  Compile and build a component
   */
  generateComponent: function(dest, templatePath, component, site) {
    var contents = fs.readFileSync(templatePath, 'utf8'),
        template = Handlebars.compile(contents),
        result = template({
          component: component.attr.dump(),
          site: site.attr.dump()
        });

    fs.writeFileSync(path.join(dest, component.attr.get('name') + '.html'), result);
  },

  /**
   *  @method generateIndex
   *  Compile and build the main index page
   */
  generateIndex: function(dest, templatePath, components) {
    var contents = fs.readFileSync(templatePath, 'utf8'),
        template = Handlebars.compile(contents),
        result = template({
          components: components
        });

    fs.writeFileSync(path.join(dest, 'index.html'), result);
  }
};
