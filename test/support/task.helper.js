var sinon = require('sinon');

module.exports = {
  logger: {
    oklns: sinon.stub(),
    errorlns: sinon.stub(),
    reset: function() {
      this.oklns.reset();
      this.errorlns.reset();
    }
  },
  configOptions: {
    componentsDirectory: 'components'
  }
};
