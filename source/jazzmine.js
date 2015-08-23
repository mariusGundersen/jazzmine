(function(exports, moquire, jasmine_it, jasmine_describe, jasmine_beforeEach, jasmine_afterEach){

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
  
  function asyncPromiseIt(jasmine_real, description, block){
    if(block.length == 1){
      jasmine_real(description, block);
    }else{
      jasmine_real(description, function(done){
        var result = block.call(this);
        if(result && typeof(result) == 'object' && 'then' in result){
          result.then(done);
        }else{
          done();
        }
      });
    }
  }
  
  function asyncPromiseRun(jasmine_real, block){
    if(block.length == 1){
      jasmine_real(block);
    }else{
      jasmine_real(function(done){
        var result = block.call(this);
        if(result && typeof(result) == 'object' && 'then' in result){
          result.then(done);
        }else{
          done();
        }
      });
    }
  }

  var describe = overload([String, Function], function(name, method){
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
    
  var jazzmine = {
    requireConfig: function(config){
      moquire.require.config(moquire.config(config));
    },
    onReady: function(then){
      moquire.then(then);
    },
    addMatchers: overload([Function], function(addMatchers){
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
    })
  };

  exports.jazzmine = jazzmine;
  exports.describe = describe;
  exports.it = asyncPromiseIt.bind(null, jasmine_it);
  exports.beforeEach = asyncPromiseRun.bind(null, jasmine_beforeEach);
  exports.afterEach = asyncPromiseRun.bind(null, jasmine_afterEach);
  exports.because = asyncPromiseRun.bind(null, jasmine_beforeEach);

})(window, moquire, it, describe, beforeEach, afterEach);