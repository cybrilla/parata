var fs = require('fs-extra'),
    Component = require('../lib/component.js');

function Parser() {
  var that = this,
      styleFilePath,
      exampleFilePath,
      styleContents,
      exampleContents,
      components = [];

  that.setExampleFilePath = function(_exampleFilePath) {
    exampleFilePath = _exampleFilePath;
    exampleContents = fs.readFileSync(exampleFilePath, 'utf8');

    return this;
  };

  that.setStyleFilePath = function(_styleFilePath) {
    styleFilePath = _styleFilePath;
    styleContents = fs.readFileSync(styleFilePath, 'utf8');

    return this;
  };

  that.run = function() {
    var pattern = /\/\*\*([\s\S]+?)\*\//gi,
        match,
        name,
        component;

    while (match = pattern.exec(styleContents)) {
      component = new Component();
      name = this.parseName(match);
      component.setAttribute('name', name)
               .setAttribute('description', this.parseDescription(match))
               .setAttribute('variants', this.parseVariants(match))
               .setAttribute('rawExample', this.parseExample(name))
               .setAttribute('scriptExample', this.parseScriptExample(match))
               .generateExampleMarkup();

      components.push(component);
    }

    return components;
  };

  that.getComponents = function() {
    return components;
  };

  that.parseName = function(input) {
    var pattern = /\*\s*@component\s+(.+)/i,
        match = pattern.exec(input);

    if(match) {
      return match[1];
    }
  };

  that.parseDescription = function(input) {
    var pattern = /\*\s*@description\s+(.+)/i,
        match = pattern.exec(input);

    if(match) {
      return match[1];
    }
  };

  that.parseScriptExample = function(input) {
    var pattern = /\*\s*@script\s+(.+)/i,
        match = pattern.exec(input);

    if(match) {
      return match[1].trim();
    }
  };

  that.parseVariants = function(input) {
    var pattern = /\s*\*\s*@variants(.+)/i,
        match = pattern.exec(input),
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
  };

  that.parseExample = function(name) {
    var pattern = new RegExp('<example\\s*for=\\"' + name + '\\">([\\s\\S]+?)<\\/example>', 'gi'),
        match = pattern.exec(exampleContents);

    if(match) {
      return match[1];
    }
  };
}

module.exports = Parser;
