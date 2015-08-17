var expect = require('chai').expect,
    Attr = require('../../lib/attr.js'),
    Site = require('../../lib/site.js'),
    taskHelper = require('../support/task.helper.js'),
    fs = require('fs-extra'),
    path = require('path');

describe('Site', function(){
  describe('Initialization', function() {

    context('with default options', function() {
      var site;

      beforeEach(function() {
        site = new Site();
      });

      it('should have `attr` as an attribute', function() {
        expect(site.attr).to.be.an('object');
      });

      it('should have `externalJavascripts` value sett to an empty array', function() {
        expect(site.attr.get('externalJavascripts')).to.be.an('array');
      });
    })

    context('when `externalJavascripts` is provided as an option', function() {
      var site,
          options = { 
            externalJavascripts: ['/app/script.js']
          };

      beforeEach(function() {
        site = new Site(options);
      });

      it('should include the correct values', function() {
        expect(site.attr.get('externalJavascripts')).to.eql([ '/app/script.js' ]);
      });
    });

  });
});
