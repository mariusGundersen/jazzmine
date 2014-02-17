
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

    var actual = this.actual;
    var notText = this.isNot ? " not" : "";

    this.message = function(){
      return "expected " + actual + notText + " to be something";
    };

    return actual === "something";
  }
});

jazzmine.addMatchers(function(matchers){
  setTimeout(function(){
    matchers({
      toBeSomethingElse: function(){

        var actual = this.actual;
        var notText = this.isNot ? " not" : "";

        this.message = function(){
          return "expected " + actual + notText + " to be something else";
        };

        return actual === "something else";
      }
    });
  }, 100);
});

jazzmine.onReady(window.__karma__.start);