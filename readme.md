# JazzmineJS

Jazzmine is an addition to Jasmine, adding and modifying it to work nicer with AMD modules and async code. 


## Installation

Install Jazzmine using npm

```
npm install jazzmine
```

### Module loading

Jazzmine is made to test individual AMD modules. This is done by loading the model, and any other dependency, right in the `describe`. For example:

```javascript
describe("a test with dependencies", ["myLittleModule"], function(myLittleModue){
  
  it("should be a module", function(){
    expect(myLittleModule).toBeDefine();
  });

});
```

This way you can load the module you want to test, and any other module needed for the test to run, right in the describe statement. 

Jazzmine will wait until all of the dependencies have loaded before it runs the tests.

### because

The `because` function is exactly the same as `beforeEach`. It is included as it works better with behaviour driven code; the `because` function describes what triggers what we want to test. For example:

```javascript
describe("when a variable is set", [], function(){
  
  var variable;

  because(function(){
    variable = "a value";
  });

  it("should have set the variable", function(){
    expect(variable).toBe("a value");
  });

});
```

### Async tests

~~Jasmine has horrible support for async testing~~. Jasmine has adopted the same async support as Jazzmine has had, so continue using it like you always have. The `beforeEach`, `afterEach`, `because` and `it` functions support async by using a done parameter, like so:

```javascript
it("should wait until the done function is called", function(done){
  
  done();

});


because(function(done){
  
  setTimeout(function(){
    done();
  }, 1000);

});

```

### Mocking

The module you want to test usually has dependencies to other modules, some of which you might want to replace during testing. Jazzmine lets you mock these dependencies during testing. The test files can mock dependencies independently of each other, which means everything is reset for your next test. This is done using [moquire](https://github.com/mariusGundersen/Moquire). For example:

```javascript
describe("mock out a dependency", {
  "someModule": function(){ return 5; }
},[
  "aModuleDependingOnSomeModule"
], function(
  aModule
){
    
  it("should swap out the dependency", function(){
    expect(aMOdule.dependency).toBe(5);
  });

});
```

## Global matchers

Matchers can be added to every test by calling `jazzmine.addMatchers()`. This method can either take an object of matchers, similar to Jasmine, or it can take a function with a callback for async registering matchers. These functions should be called before calling `jazzmine.onReady()`.

```js
jazzmine.addMatchers({
  toBeSomething: function(){
    return {
      compare: function(actual){
        var result = actual === "something";
        var notText = result ? " not" : "";


        return {
          pass: result,
          message: "expected " + actual + notText + " to be something"
        };
      }
    };
  }
});

jazzmine.addMatchers(function(matchers){
  require(['Matchers/toBeSomethingElse'], function(toBeSomethingElse){
    matchers({
      toBeSomethingElse: toBeSomethingElse
    });
  });
});
```

## Setup with Karma

Jazzmine will work with any test runner, but here is an example of using it with Karma. Install Karma with npm:

```
npm install karma
```

Next add a `karma.conf.js` file with all the files karma should load and make available. Because we are using requireJS, we don't have to load the modules we are testing; they will be loaded by the tests that need them. But karma needs to be told to include them! Here is an example `karma.conf.js`:

```javascript
module.exports = function(config){
  config.set({

    frameworks: [
      'jasmine'
    ],

    files: [
      'node_modules/requirejs/require.js',
      'node_modules/jazzmine/bin/jazzmine.min.js',
      'node_modules/karma-requirejs/lib/adapter.js',
      //add other libraries needed for testing here (for example sinon)

      'test/specs-main.js',
      {pattern: 'source/**/*.js', included: false},
      {pattern: 'test/Mocks/**/*.js', included: false},
      {pattern: 'test/Matchers/**/*.js', included: false},
      {pattern: 'test/Given/**/*.js', included: false},
      'test/Modules/**/*.js'
    ],

    exclude: [

    ],

    reporters: ['dots'],

    autoWatch: true

  });
};
```

This file assumes your project is set up with a `source` and `test` folder next to the `karma.conf.js` file. We need to configure requireJS with the correct paths, baseUrl and any other options needed for your project. This config is usually pretty similar to your `main.js` config file. The `test/specs-main.js` contains this configuration. Here is an example of the `specs-main.js` file:

```javascript
jazzmine.requireConfig({
  // Karma serves files from '/base'
  baseUrl: '/base',

  paths: {
    "Mocks": "test/Mocks",
    "Given": "test/Given",
    "Matchers": "test/Matchers",
  }
});


jazzmine.onReady(window.__karma__.start);
```

Notice the last line, which starts the karma test runner once all the tests have loaded. 

To start the tests, run karma from the directory with the `karma.conf.js` file:

```
karma start
```