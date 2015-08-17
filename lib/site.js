var fs = require('fs-extra'),
    path = require('path'),
    Handlebars = require('handlebars'),
    Attr = require('./attr.js');

/**
 *  Site
 */
module.exports = function(_options) {
  var that = this,
      options = typeof _options === 'undefined' ? {} : _options,
      attr;

  // Create data attributes for the component
  that.attr = attr = new Attr();

  // Default attributes for the component
  attr.load({
    externalJavascripts: []
  });

  // Set the `external Js` 
  if(typeof options.externalJavascripts !== 'undefined') { attr.set('externalJavascripts', options.externalJavascripts); }
};
