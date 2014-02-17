describe("using matchers", function(){
  
  it("should register matchers object globally", function(){
    expect("something").toBeSomething();
  });

  it("should register async matchers function globally", function(){
    expect("something else").toBeSomethingElse();
  });

  it("should register toBeA matchers", function(){
    expect("hello").toBeA(String);
  });

  it("should register toBeAn matchers", function(){
    expect(34).not.toBeAn(Array);
  });

});