var fs = require('fs-extra'),
    path = require('path'),
    Handlebars = require('handlebars'),
    Attr = require('./attr.js');

/**
 *  Component
 */
module.exports = function() {
  var that = this,
      attr;

  // Create data attributes for the component
  that.attr = attr = new Attr();

  // Default attributes for the component
  attr.load({
    name: null,
    description: null,
    rawExample: null,
    variants: null,
    scriptExample: null,
    examples: null
  });

  /**
   *  @method generateExampleMarkup
   *  Generate HTML markup for the example and set the `examples` attribute
   */
  that.generateExampleMarkup = function() {
    var variants = attr.get('variants'),
        i, length,
        template = Handlebars.compile(attr.get('rawExample')),
        data = {
          name: attr.get('name'),
          variant: ''
        },
        scriptExample = null,
        examples = [];

    if(attr.get('scriptExample')) {
      scriptExample = attr.get('scriptExample');
    }

    // If multiple variants are available then build
    // an example for each
    if(variants.length < 1) {
      examples.push({
        variant: '',
        code: template(data),
        scriptExample: scriptExample
      });
    }
    else {
      for(i=0, length=variants.length; i<length; i++) {
        data.variant = variants[i];
        examples.push({
          variant: variants[i],
          code: template(data),
          scriptExample: scriptExample
        });
      }
    }

    // Set the `examples` attribute
    attr.set('examples', examples);

    return this;
  };
};
