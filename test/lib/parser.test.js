var expect = require('chai').expect,
    fs = require('fs-extra'),
    path = require('path'),
    Parser = require('../../lib/parser.js');

describe('Parser', function(){

  var parser = new Parser(),
      exampleFilePath = path.join(__dirname, '../fixtures/example.html'),
      styleFilePath = path.join(__dirname, '../fixtures/style.sass');

  describe('#setExampleFilePath', function() {
    it('returns object of type Parser', function() {
      expect(parser.setExampleFilePath(exampleFilePath)).to.equal(parser);
    });
  });

  describe('#setExampleContents', function() {
    it('returns object of type Parser', function() {
      expect(parser.setExampleContents()).to.equal(parser);
    });
  });

  describe('#setStyleFilePath', function() {
    it('returns object of type Parser', function() {
      expect(parser.setStyleFilePath(styleFilePath)).to.equal(parser);
    });
  });

  describe('#setStyleContents', function() {
    it('returns object of type Parser', function() {
      expect(parser.setStyleContents()).to.equal(parser);
    });
  });

  describe('parsing methods', function() {

    var parsingFilePath = path.join(__dirname, '../fixtures/parse_input.html'),
        parsingContents = fs.readFileSync(parsingFilePath, 'utf8'),
        emptyContents = '';

    describe('#parseName', function() {
      it('should parse the name correctly', function() {
        expect(parser.parseName(parsingContents)).to.equal('component-name-1');
      });

      it('should return empty in case of no match', function() {
        expect(parser.parseName(emptyContents)).to.be.empty;
      });
    });

    describe('#parseDescription', function() {
      it('should parse the description correctly', function() {
        expect(parser.parseDescription(parsingContents)).to.equal('I am an awesome component 1.');
      });

      it('should return empty in case of no match', function() {
        expect(parser.parseDescription(emptyContents)).to.be.empty;
      });
    });

    describe('#parseVariants', function() {
      it('should parse the variants correctly', function() {
        expect(parser.parseVariants(parsingContents)).to.have.length(3);
        expect(parser.parseVariants(parsingContents)).to.include('primary', 'default', 'secondary');
      });

      it('should return empty in case of no match', function() {
        expect(parser.parseVariants(emptyContents)).to.be.empty;
      });
    });

    describe('#parseHTMLExample', function() {
      it('should parse the HTML correctly', function() {
        expect(parser.parseHTMLExample('component-name-1')).to.be.eq('\n<div class="component-name-1"></div>\n');
      });

      it('should return empty in case of no match', function() {
        expect(parser.parseHTMLExample(emptyContents)).to.be.empty;
      });
    });

    describe('#parseJSExample', function() {
      it('should parse the JS correctly', function() {
        expect(parser.parseJSExample('component-name-1')).to.be.eq('\ndocument.write("Example Script")\n');
      });

      it('should return empty in case of no match', function() {
        expect(parser.parseJSExample(emptyContents)).to.be.empty;
      });
    });

  });

  describe('#getComponents', function() {
    it('returns empty for no existing components', function() {
      expect(parser.getComponents()).to.be.empty;
    });

    it('returns existing components if present', function() {
      parser.run();
      expect(parser.getComponents()).to.have.length(1);
    });
  });

  describe('#run', function() {
    it('generates and returns the all the components', function() {
      expect(parser.run()).to.have.length(2);
    });
  });
});
