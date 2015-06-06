module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    sketchbox: {
      options: {
        stylePreProcessor: 'scss'
      },
    },
    sass: {                              
      dist: {                            
        options: {                       
          style: 'expanded'
        },
        files: {                         
          'dist/app.dist.css': 'components/app.scss'
        }
      }
    }
  });

  // Load custom task(s).
  grunt.task.loadTasks('./grunt-tasks/sketchbox');

  // Load Sass task
  grunt.loadNpmTasks('grunt-contrib-sass');
};
