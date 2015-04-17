

(function(){
  
  function functionName(m){
    return m.name || m.toString().match(/function\s+([^(]+)/)[1];
  }

  function typeOf(obj) {
    var typeString = ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1];
    if(typeString == "Object"){
      return functionName(obj.constructor);
    }else{
      return typeString;
    }
  }

  function toBeA(aOrAn, actual, type){
    var actual = typeOf(actual);
    var expected = functionName(type);

    var result = actual === expected;
    var notText = result ? " not" : "";

    return {
      pass: result,
      message: "expected " + actual + notText + " to be " + aOrAn + expected
    };
  }

  jazzmine.addMatchers({
    toBeA: function(util, customEqualityTesters){
      return {
        compare: toBeA.bind(this, "a ")
      };
    },
    toBeAn: function(util, customEqualityTesters){
      return {
        compare: toBeA.bind(this, "an ")
      };
    }
  });

})();