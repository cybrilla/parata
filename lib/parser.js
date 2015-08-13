var fs = require('fs-extra'),
    Component = require('../lib/component.js');

/**
 *  Parser
 *  Parses the contents from a file and creates an object
 */
function Parser() {
  var that = this,
      styleFilePath,
      exampleFilePath,
      styleContents,
      exampleContents,
      components = [];

  /*
   * @method setExampleFilePath
   * Sets the example file path for a given component item
   */
  that.setExampleFilePath = function(_exampleFilePath) {
    exampleFilePath = _exampleFilePath;
    that.setExampleContents();

    return this;
  };

  /*
   * @method setExampleContents
   * Sets the example contents corresponding to the example file for a given component item
   */
  that.setExampleContents = function() {
    exampleContents = fs.readFileSync(exampleFilePath, 'utf8');

    return this;
  };

  /*
   * @method setStyleFilePath
   * Sets the style file path for a given component item
   */
  that.setStyleFilePath = function(_styleFilePath) {
    styleFilePath = _styleFilePath;
    that.setStyleContents();

    return this;
  };

  /*
   * @method setStyleContents
   * Sets the style contents corresponding to the style file for a given component item
   */
  that.setStyleContents = function() {
    styleContents = fs.readFileSync(styleFilePath, 'utf8');

    return this;
  };

  /**
   * @method run
   * Main method that gets called to create an object of parsed contents
   */
  that.run = function() {
    var pattern = /\/\*\*([\s\S]+?)\*\//gi,
        match,
        name,
        component;

    while (match = pattern.exec(styleContents)) {
      component = new Component();
      name = this.parseName(match);

      // Set component attributes
      component.attr
               .set('name', name)
               .set('description', this.parseDescription(match))
               .set('variants', this.parseVariants(match))
               .set('rawExample', this.parseHTMLExample(name))
               .set('scriptExample', this.parseJSExample(name));


      // Compile and generate the example markup
      component.generateExampleMarkup();

      components.push(component);
    }

    return components;
  };

  /**
   *  @method getComponents
   *  Returns a list of all components
   */
  that.getComponents = function() {
    return components;
  };

  /**
   * @method parseName
   * Parse the name for a component from the input
   */
  that.parseName = function(input) {
    var pattern = /\*\s*@component\s+(.+)/i,
        match = pattern.exec(input);

    if(match) {
      return match[1];
    }

    return '';
  };

  /**
   * @method parseDescription
   * Parse description for the component from the input
   */
  that.parseDescription = function(input) {
    var pattern = /\*\s*@description\s+(.+)/i,
        match = pattern.exec(input);

    if(match) {
      return match[1];
    }

    return '';
  };

  /**
   *  @mehtod parseVariants
   *  Parse different variants usually class names for a stylesheet from the input
   */
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

  /**
   *  @mehtod parseHTMLExample
   *  Parse the html example from the input
   */
  that.parseHTMLExample = function(name) {
    var pattern = new RegExp('<example\\s*for=\\"' + name + '\\">([\\s\\S]+?)<\\/example>', 'gi'),
        match = pattern.exec(exampleContents);

    if(match) {
      return match[1];
    }

    return '';
  };

  /**
   *  @mehtod parseJSEcample
   *  Parse javascript example for the given input
   */
  that.parseJSExample = function(name) {
    var pattern = new RegExp('<script\\s*for=\\"' + name + '\\">([\\s\\S]+?)<\\/script>', 'gi'),
        match = pattern.exec(exampleContents);

    if(match) {
      return match[1];
    }

    return '';
  };
}

module.exports = Parser;
