//notice the empty array here!
describe("a normal describe", [], function(){
  
  it("should run normally", function(){
    expect("something").toBe("something");
  });

  describe("with another describe inside it", function(){

    it("should run normally", function(){
      expect(true).toBeTruthy();
    });

  });

  describe("with a because clause", function(){

    because(function(){
      this.something = "a string";
    });

    it("should run the because before the test", function(){
      expect(this.something).toBe("a string");
    });

  });

  describe("with a before and after each", function(){

    var test = 2

    beforeEach(function(){
      test++;
    });

    it("should increment the value before each test", function(){
      expect(test).toBe(3);
    });

    it("should reset the value after each test (and then increment it again before this test)", function(){
      expect(test).toBe(1);
    });

    afterEach(function(){
      test = 0;
    });

  });

});