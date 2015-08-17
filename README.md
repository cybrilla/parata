# Parata

[![Circle CI](https://circleci.com/gh/cybrilla/parata.svg?style=svg)](https://circleci.com/gh/cybrilla/parata)
[![Code Climate](https://codeclimate.com/github/cybrilla/parata/badges/gpa.svg)](https://codeclimate.com/github/cybrilla/parata)
[![Stories in Ready](https://badge.waffle.io/cybrilla/parata.png?label=ready&title=Ready)](https://waffle.io/cybrilla/parata)

Component based styles for the web. Parata enforces you to build re-usable components for the web and generates a component wise styleguide.

## Getting Started
Parata is packaged as a `grunt` plugin. So, make sure you install [GruntJS](http://gruntjs.com). There is a generator included which is packaged as a `yeoman` generator. Refer here to get started on the generator: https://github.com/cybrilla/generator-parata

Or simply run: `$ npm install -g generator-parata`. You may required root permissions for it. Also make sure you have yeoman installed. Make sure you read the docs: https://github.com/cybrilla/generator-parata

## Quick example
Generate a `button` component if you haven't created one using the generator.
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

#### Build
```
$ grunt parata --build
```

#### Serve
```
$ grunt serve
```

This will start a server at `http://localhost:8888`.

