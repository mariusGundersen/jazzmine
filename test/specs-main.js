
jazzmine.requireConfig({
  // Karma serves files from '/base'
  baseUrl: '/base',

  paths: {
    "Mocks": "test/Mocks",
    "Given": "test/Given",
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
  setTimeout(function(){
    matchers({
      toBeSomethingElse: function(){
        return {
          compare: function(actual){
            var result = actual === "something else";
            var notText = result ? " not" : "";


            return {
              pass: result,
              message: "expected " + actual + notText + " to be something else"
            };
          }
        };
      }
    });
  }, 100);
});

jazzmine.onReady(window.__karma__.start);