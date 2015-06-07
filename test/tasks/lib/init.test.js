var expect = require('chai').expect,
    initAction = require('../../../tasks/lib/init.js'),
    taskHelper = require('../../support/task.helper.js'),
    fs = require('fs-extra');

describe('init', function(){
  var options = taskHelper.configOptions,
      logger = taskHelper.logger;

  describe('when `components` directory does not exist', function() {

    afterEach(function(done) {
      if(fs.existsSync(options.componentsDirectory)) {
        fs.removeSync(options.componentsDirectory);
        logger.reset();
      }

      done();
    });

    it("creates a components directory with the correct name", function(done) {
      initAction('init', options, logger, function() {
        expect(fs.existsSync(options.componentsDirectory)).to.be.true;
        done();
      });
    });

    it("creates a style bootstrap file", function(done) {
      initAction('init', options, logger, function() {
        expect(fs.existsSync(options.componentsDirectory + '/app.' + options.stylePreProcessor)).to.be.true;
        done();
      });
    });

    it("calls the success logger", function(done) {
      initAction('init', options, logger, function() {
        expect(logger.oklns.called).to.equal(true);
        done();
      });
    });

    it("does not call the error logger", function(done) {
      initAction('init', options, logger, function() {
        expect(logger.errorlns.called).to.equal(false);
        done();
      });
    });
  });

  describe('when `components` directory exist', function() {
    beforeEach(function() {
      fs.mkdirSync(options.componentsDirectory);
    });

    afterEach(function(done) {
      fs.rmdirSync(options.componentsDirectory);
      logger.reset();
      done();
    });

    it("calls the error logger", function(done) {
      initAction('init', options, logger, function() {
        expect(logger.errorlns.called).to.be.true;
        done();
      });
    });

    it("does not call the success logger", function(done) {
      initAction('init', options, logger, function() {
        expect(logger.oklns.called).to.be.false;
        done();
      });
    });
  });
});
