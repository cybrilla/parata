module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['test/**/*.test.js']
      }
    }
  });

  // Load custom task(s).
  grunt.loadTasks('tasks');

  // Load grunt mocha task
  grunt.loadNpmTasks('grunt-mocha-test');

  // Register tasks
  grunt.registerTask('test', 'mochaTest');
};
