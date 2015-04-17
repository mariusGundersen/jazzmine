window.jazzmine = (function(moquire, jasmine_describe, jasmine_beforeEach){

  function mockTests(mocks, dependencies, name, method){
    moquire(mocks, dependencies, function(){
      var modules = arguments;
      jasmine_describe(name, function(){
        method.apply(this, modules);
      });
    });
  }
  function runTests(dependencies, name, method){
    moquire({}, dependencies, function(){
      var modules = arguments;
      jasmine_describe(name, function(){
        method.apply(this, modules);
      });
    });
  }

  describe = overload([String, Function], function(name, method){
    jasmine_describe(name, method);
  }).when([Array, String, Function], function(dependencies, name, method){
    mockTests({}, dependencies, name, method);
  }).when([Object, Array, String, Function], function(mocks, dependencies, name, method){
    mockTests(mocks, dependencies, name, method);
  }).when([String, Array, Function], function(name, dependencies, method){
    mockTests({}, dependencies, name, method);
  }).when([String, Object, Array, Function], function(name, mocks, dependencies, method){
    mockTests(mocks, dependencies, name, method);
  });

  because = jasmine_beforeEach;
  
  var jazzmine = {};

  jazzmine.requireConfig = function(config){
    moquire.require.config(moquire.config(config));
  };

  jazzmine.onReady = function(then){
    moquire.then(then);
  };

  jazzmine.addMatchers = overload([Function], function(addMatchers){
    jasmine_beforeEach(function(done){
      addMatchers(function(matchers){
        jasmine.addMatchers(matchers);
        done();
      }.bind(this));
    });
  }).when([Object], function(matchers){
    jasmine_beforeEach(function(){
      jasmine.addMatchers(matchers);
    });
  });

  return jazzmine;

})(moquire, describe, beforeEach);