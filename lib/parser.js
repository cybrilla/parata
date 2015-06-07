var fs = require('fs-extra');

module.exports = {
  parseCommentBlock: function(styleContents, exampleContents) {
    var pattern = /\/\*\*([\s\S]+?)\*\//gi,
        match,
        results = [],
        that = this,
        componentName,
        classNames;

    while (match = pattern.exec(styleContents)) {
      componentName = that.parseName(match);
      classNames = this.parseClassNames(match);

      results.push({
        name: componentName,
        description: that.parseDescription(match),
        example: that.getExampleForComponent(componentName, exampleContents),
        classNames: classNames
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

  parseClassNames: function(contents) {
    var pattern = /\s*\*\s*@variants(.+)/i,
        match = pattern.exec(contents),
        variants,
        results = [],
        i, length;

    if(match) {
      variants = match[1].split("|");
      for(i=0, length=variants.length; i<length; i++) {
        results.push(variants[i].trim());
      }
    }

    return results;
  },

  getExampleForComponent: function(name, contents) {
    var pattern = new RegExp('<example\\s*for=\\"' + name + '\\">([\\s\\S]+?)<\\/example>', 'gi'),
        match = pattern.exec(contents),
        result = [];

    if(match) {
      return match[1];
    }

    return result;
  }
};
