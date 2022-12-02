## 5. Markup and Content

### Automated optimization of JS and CSS

- Build Process

  - Dev track(./src)

    - Verbose code with comments
    - Code linting
    - Pre/post processing
    - Tests

  - Build track(./build)

    - Optimized + minified + uglified code
    - Bundled assets
    - Tests

- JavaScript Optimization

  - Minify to reduce size
  - "Uglify" to improve code efficiency
  - Code split and use ESM modules when possible

- CSS Optimization

  - Minify to reduce size
  - Post process with PostCss
  - Inline critical CSS
  - Defer loading on non-critical CSS

### JS bundling vs. ESM modules

Bundling JavaScript - HTTP/1.1
ESM modules JavaScript - HTTP/2.0 Multiplexing, import()

- Ideal JavaScript Loading

  - To start, load only JS to get the app framework up and running
  - Next, load necessary JS modules for functionality
  - Conditionally import ESM modules only when they are needed

- Benefits to ESM Modules Approach

  - Modern web apps already modules(components)
  - Modularization creates clear separation of concerns
  - conditionally loading modules = significant performance benefits
  - When modules update, the browser only need to download the new module, not all the JS on the site

- ESM modules and Lazy Loading Support

  - Webpack
  - Snowpack
  - Parcel
  - Rollup

### JS loading: async and defer

![JS default async defer vs](../assets/JavaScript%20default%20async%20defer%20vs.PNG)

JavaScript causes loading block

- JavaScript Considerations

  - When should the JavaScript be loaded
  - When should the JavaScript be executed
  - Does the JavaScript need to be loaded and executed on first load or can it wait for some condition to be met?

- JavaScript Loading: Best Practices

  - Place `<script>` tag in `<head>`
  - Use `async` as default
  - `defer` scripts that needed a fully built DOM
  - Not using async/defer is an anti-pattern
  - `<script>` tag in the footer is an anti-pattern

### Lazy-loading JS modules with import()

- [import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

### Minifying and uglifying JS

- Minification

  - Remove white space
  - Remove comments
  - Make the entire script one line

- Uglification/Mangling

  - Shorten variable names
  - Shorten function names
  - Optimize code for terseness

- Tools suggestions

  - [uglify.js - npm](https://www.npmjs.com/package/uglify-js)

  - [terser - npm](https://www.npmjs.com/package/terser)

### Critical CSS

- Critical Css

  - Inline any styles impacting the content above the fold in the HTML doc
  - Defer loading of non-critical CSS using a separate stylesheet and some clever JavaScript

- [critical - npm](https://www.npmjs.com/package/critical)

  many customize options for meet your need
  Help you manage and breakdown your CSS

### Deferring noncritical CSS

- preload   
  ![preload](../assets/CSS%20preload.PNG)
- disabled   
  ![disabled](../assets/CSS%20disabled.PNG)
- In-Body CSS Loading   
  ![In-Body](../assets/CSS%20In-Body.PNG)

***
## <<< [Improve Web Performance](../README.md)
*** 