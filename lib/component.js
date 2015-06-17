var fs = require('fs-extra'),
    Handlebars = require('handlebars');

module.exports = function(config) {
  var that = this,
      attributes;

  attributes = {
    name: null,
    description: null,
    rawExample: null,
    variants: null,
    examples: []
  };

  // Return constructed markup for the component
  that.generateExampleMarkup = function() {
    var variants = attributes.variants,
        i, length,
        template = Handlebars.compile(attributes.rawExample),
        data = {
          name: attributes.name,
          variant: ''
        };

    if(variants.length < 1) {
      attributes.examples.push({
        variant: '',
        code: template(data)
      });
    }
    else {
      for(i=0, length=variants.length; i<length; i++) {
        data.variant = variants[i];
        attributes.examples.push({
          variant: variants[i],
          code: template(data)
        });
      }
    }

    return this;
  };

  // Set an attribute that will be serialized
  that.setAttribute = function(key, value) {
    attributes[key] = value;

    return that;
  };

  // Return all attributes
  that.getAttributes = function() {
    return attributes;
  }
};
