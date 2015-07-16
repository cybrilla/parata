var expect = require('chai').expect,
    Attr = require('../../lib/attr.js'),
    Site = require('../../lib/site.js'),
    taskHelper = require('../support/task.helper.js'),
    fs = require('fs-extra'),
    path = require('path');

describe('Site', function(){
  describe('Initialisation', function() {
    var options = { 
        externalJavascripts: ['/app/script.js']
      };
    
    beforeEach(function() {
      var site = new Site(options);
   });

    it("should have its argument as an object", function() {
      expect(options).to.be.an('object');
  });
    it("options should have  externalJavascripts as an attribute", function() {
      expect(options.externalJavascripts).to.not.be.undefined;
  });
    it("externalJavascripts should be an array", function() {
      expect(options.externalJavascripts).to.be.an('array');
  });

  });

});
