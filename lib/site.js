var fs = require('fs-extra'),
    path = require('path'),
    Handlebars = require('handlebars'),
    Attr = require('./attr.js');

/**
 *  Component
 */
module.exports = function(options) {
  var that = this,
      attr;

  // Create data attributes for the component
  that.attr = attr = new Attr();

  // Default attributes for the component
  attr.load({
    externalJavascripts: null
  });

  // Set the `external Js` 
    attr.set('externalJavascripts', options.externalJavascripts);
  /**
   *  @method generateSite
   *  Generate external JS for the example and set the `JS` attribute
   */
};
