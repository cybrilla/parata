# Parata
Component based styles for the web. Parata enforces you to build re-usable components for the web and generates a component wise styleguide.

## Getting Started
Parata is packaged as a `grunt` plugin. So, make sure you install [GruntJS](http://gruntjs.com). .

Once `grunt` is installed, follow the steps listed below:
### Initialize an empty `npm` project
```
$ npm init
```

### Install Parata
```
$ npm install parata --save
```

### Add Parata to Gruntfile.js
```
  grunt.initConfig({
    parata: {
      options: {
        stylePreProcessor: 'scss'
      }
    }
  });
  
grunt.loadNpmTasks('parata');
```
 
### Configure sass / less
```
  grunt.initConfig({
  parata: {
    options: {
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
grunt.loadNpmTasks('parata');

grunt.loadNpmTasks('grunt-contrib-sass');
```

### Initialize Parata
```
$ grunt parata --init
```
 
### Create a component
```
$ grunt parata --component button
```

### Compile sass / less
```
$ grunt sass
```

### Build components
```
$ grunt parata --build
```

### Preview your component
```
$ grunt parata --serve
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


#### Create an HTML sample / example for the component in example.html
```
<example for="button">
<button class="{{ variant }}">{{ variant }}</button>
</example>
```

#### Create a javascript snippet for the component in example.html
```
<script for="button">
alert("Hello I'm a component!");
</script>
```

### Customize options
`stylePreProcessor`   :    Extension of your style files. Eg.: `scss` or `less`.

`componentsDirectory` :    Path where all your components reside.

`dest`                :    Destination where all the build files go into.

`serverPort`          :    Default port the `serve` task.
