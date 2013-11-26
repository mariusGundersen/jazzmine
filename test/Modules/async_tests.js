describe("async tests", [], function(){
  
  it("should wait until the done function is called", function(done){

    expect(2).toBe(2);

    setTimeout(function(){
      expect(100).toBe(100);
      done();
    }, 100);

  });

  describe("inside beforeEach", function(){

    var something = false;

    beforeEach(function(done){

      setTimeout(function(){
        something = true;
        done();
      }, 100);

    });

    it("should wait for the beforeEach to be done", function(){
      expect(something).toBe(true);
    });

  });

  describe("inside because", function(){

    var something = false;

    because(function(done){

      setTimeout(function(){
        something = true;
        done();
      }, 100);

    });

    it("should wait for the because to be done", function(){
      expect(something).toBe(true);
    });

  });

  describe("inside afterEach", function(){

    var something = false;

    afterEach(function(done){

      setTimeout(function(){
        something = true;
        done();
      }, 100);

    });

    it("should run the afterEach after this test", function(){
      expect(something).toBe(false);
    });

    it("should wait for the afterEach to be done", function(){
      expect(something).toBe(true);
    });

  });

});