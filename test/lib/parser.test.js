var expect = require('chai').expect,
    fs = require('fs-extra'),
    path = require('path'),
    parser = require('../../lib/parser.js');

describe('Comments Parser', function(){
  var styleContents = fs.readFileSync(path.join(__dirname, '../fixtures/style.sass')),
      exampleContents = fs.readFileSync(path.join(__dirname, '../fixtures/example.html')),
      results;

  before(function() {
    results = parser.parseCommentBlock(styleContents, exampleContents);
  });

  it("returns the correct size for results", function() {
    expect(results.length).to.equal(2);
  });

  it("returns the correct data for a component", function() {
    var component = results[0],
        expected = {
          name: 'component-name-1',
          description: 'I am an awesome component 1.',
          example: '\n<div class=\"component-name-1\"></div>\n'
        };

    expect(component).to.deep.equal(expected);
  });
});
