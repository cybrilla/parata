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
        logger.reset();
        fs.removeSync(path.join(componentRootPath, componentName));
        done();
      });

      it("creates a sub-directory with the provided name", function(done) {
        componentAction(componentName, options, logger, function() {
          expect(fs.existsSync(path.join(componentRootPath, componentName))).to.be.true;
          expect(logger.oklns.called).to.equal(true);
          done();
        });
      });

      it("creates the correct number of files in the sub-directory", function(done) {
        componentAction(componentName, options, logger, function() {
          var contents = fs.readdirSync(path.join(componentRootPath, componentName));
          expect(contents.length).to.equal(2);
          expect(logger.oklns.called).to.equal(true);
          done();
        });
        
      });

      it("create a style file named correctly", function(done) {
        componentAction(componentName, options, logger, function() {
          expect(fs.existsSync(path.join(componentRootPath, componentName, 'style.' + options.stylePreProcessor))).to.be.true;
          expect(logger.oklns.called).to.equal(true);
          done();
        });
      });

      it("contains the correct contents for the created style file", function(done) {
        componentAction(componentName, options, logger, function() {
          var src = fs.readFileSync(path.join(componentRootPath, componentName, 'style.' + options.stylePreProcessor), 'utf-8'),
              dest = fs.readFileSync(path.join(__dirname, '../../../tasks/templates/component/style.tpl'), 'utf-8');

          expect(src).to.equal(dest);
          done();
        });
      });

      it("create an example file named correctly", function(done) {
        componentAction(componentName, options, logger, function() {
          expect(fs.existsSync(path.join(componentRootPath, componentName, 'example.html'))).to.be.true;
          expect(logger.oklns.called).to.equal(true);
          done();
        });
        
      });

      it("contains the correct contents for the created example file", function(done) {
        componentAction(componentName, options, logger, function() {
          var src = fs.readFileSync(path.join(componentRootPath, componentName, 'example.html'), 'utf-8'),
              dest = fs.readFileSync(path.join(__dirname, '../../../tasks/templates/component/example.html'), 'utf-8');

          expect(src).to.equal(dest);
          done();
        });
      });

    });
  });

});
