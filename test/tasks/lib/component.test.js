var expect = require('chai').expect,
    componentAction = require('../../../tasks/lib/component.js'),
    taskHelper = require('../../support/task.helper.js'),
    fs = require('fs-extra'),
    path = require('path');

describe('Component Task', function(){
  var options = taskHelper.configOptions,
      logger = taskHelper.logger;

  describe('when `components` directory exists', function() {
    var componentRootPath = path.join(process.cwd(), options.componentsDirectory); 

    before(function() {
      if(!fs.existsSync(componentRootPath)) {
        fs.mkdirSync(componentRootPath);
      }
    });

    after(function(done) {
      fs.removeSync(componentRootPath);
      done();
    });

    describe("when component name is provided", function() {
      
      var componentName = 'button';

      afterEach(function(done) {
        fs.removeSync(path.join(componentRootPath, componentName));
        done();
      });

      it("creates a sub-directory with the provided name", function(done) {
        componentAction(componentName, options, logger, function() {
          expect(fs.existsSync(path.join(componentRootPath, componentName))).to.be.true;
          done();
        });
      });

      it("creates the correct number of files in the sub-directory", function(done) {
        componentAction(componentName, options, logger, function() {
          var contents = fs.readdirSync(path.join(componentRootPath, componentName));
          expect(contents.length).to.equal(2);
          done();
        });
        
      });

      it("create a style file named correctly", function(done) {
        componentAction(componentName, options, logger, function() {
          expect(fs.existsSync(path.join(componentRootPath, componentName, 'style.' + options.stylePreProcessor))).to.be.true;
          done();
        });
      });

      it("create an example file named correctly", function(done) {
        componentAction(componentName, options, logger, function() {
          expect(fs.existsSync(path.join(componentRootPath, componentName, 'example.html'))).to.be.true;
          done();
        });
        
      });

    });
  });

});
