module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    sketchbox: {
      options: {
        stylePreProcessor: 'scss'
      },
    }
  });

  // Load custom task(s).
  grunt.task.loadTasks('./grunt-tasks/sketchbox');
};
