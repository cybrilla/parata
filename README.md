# SketchBox
Component based styles for the web.

## Getting Started
Sketchbox is packaged as a `grunt` plugin. So, make sure you install [GruntJS](http://gruntjs.com).

Once `grunt` is installed, follow the steps listed below:
### Initialize an empty `npm` project
```
$ npm init
```

### Install Sketchbox
```
$ npm install sketchbox --save
```

### Add Sketchbox to Gruntfile.js
```
  grunt.initConfig({
    sketchbox: {
      options: {
        stylePreProcessor: 'scss'
      }
    }
  });
  
grunt.loadNpmTasks('sketchbox');
 ```
 
 ### Configure sass / less
 ```
   grunt.initConfig({
    sketchbox: {
      options: {
        stylePreProcessor: 'scss'
      }
    },
    sass: {
      dist: {
        files: {
          'dist/app.dist.css': 'components/app.scss'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('sketchbox');

  grunt.loadNpmTasks('grunt-contrib-sass');
 ```
 
 ### Initialize Sketchbox
 ```
 $ grunt sketchbox --init
 ```
 
 ### Create a component
 ```
 $ grunt sketchbox --component button
 ```
 
 ### Compile sass / less
 ```
 $ grunt sass
 ```
 
 ### Preview your component
 ```
 $ grunt sketchbox --serve
 ```
 Navigate to: `http://localhost:8888/test/button`
 
 ## Quick example
 Open `components/button/` in your editor.
 
 #### Add some styling
 ```
 /**
  * @component button
  * @description Button.
  * @variants primary | secondary | default
  */

button {
  color: #F5F5F5;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
  &.primary {
    background: blue;
  }
  &.secondary {
    background: red;
  }
  &.default {
    background: yellow;
  }
}
```
 
 #### Import the component to `components/app.scss`
 ```
 /**
   * Bootstrap file for all styles
   */

    @import 'button/style'
 ```
 
 #### Create sa sample / example for the component
 ```
<example for="button">
<button class="{{ className }}">Button</button>
</example>
 ```
 
 P.S.: Still in development / Not available via npm.
