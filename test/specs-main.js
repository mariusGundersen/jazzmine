
jazzmine.requireConfig({
  // Karma serves files from '/base'
  baseUrl: '/base',

  paths: {
    "Mocks": "test/Mocks",
    "Given": "test/Given",
    "Matchers": "test/Matchers"
  }
});

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

jazzmine.onReady(window.__karma__.start);