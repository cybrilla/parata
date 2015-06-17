var fs = require('fs-extra'),
    Handlebars = require('handlebars');

module.exports = function(config) {
  var that = this,
      attributes;

  attributes = {
    name: null,
    description: null,
    rawExample: null,
    classNames: null,
    example: null
  };

  // Return constructed markup for the component
  that.generateExampleMarkup = function() {
    var classNames = attributes.classNames,
        i, length,
        template = Handlebars.compile(attributes.rawExample),
        contents = [],
        data = {
          name: attributes.name,
          className: ''
        };

    if(classNames.length < 1) {
      contents.push(template(data))
    }
    else {
      for(i=0, length=classNames.length; i<length; i++) {
        data.className = classNames[i];
        contents.push(template(data))
      }
    }

    attributes.example = contents.join('<br />');

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
