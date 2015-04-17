define(function(){
  return function toBeSomethingElse(){
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
  };
});