var fs = require('fs-extra'),
    hbs = require('hbs');

module.exports = function(config) {
  var that = this,
      i, j, length,
      examples = [],
      component,
      template,
      elength;

  if(config.classNames.length > 0) {
    for(j=0, elength=config.classNames.length; j<elength; j++) {
      template = hbs.compile(config.example);
      examples.push(template({
        className: config.classNames[j]
      }));
    }
  }
  else {
    examples.push(config.example);
  }

  that.getExamples = function() {
    return examples;
  };
};
