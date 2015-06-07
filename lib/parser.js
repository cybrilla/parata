var fs = require('fs-extra');

module.exports = {
  parseCommentBlock: function(styleContents, exampleContents) {
    var pattern = /\/\*\*([\s\S]+?)\*\//gi,
        match,
        results = [],
        that = this,
        componentName;

    while (match = pattern.exec(styleContents)) {
      componentName = that.parseName(match);
      results.push({
        name: componentName,
        description: that.parseDescription(match),
        example: that.getExampleForComponent(componentName, exampleContents)
      });
    }

    return results;
  },

  parseName: function(contents) {
    var pattern = /\*\s*@component\s+(.+)/i,
        match = pattern.exec(contents);

    if(match) {
      return match[1];
    }
  },

  parseDescription: function(contents) {
    var pattern = /\*\s*@description\s+(.+)/i,
        match = pattern.exec(contents);

    if(match) {
      return match[1];
    }
  },

  getExampleForComponent: function(name, contents) {
    var pattern = new RegExp('<example\\s*for=\\"' + name + '\\">([\\s\\S]+?)<\\/example>', 'gi'),
        match = pattern.exec(contents);

    if(match) {
      return match[1];
    }
  }
};
