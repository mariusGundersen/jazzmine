describe("promise tests", [], function(){
  
  it("should wait until the promise resolves", function(){
    return Promise.resolve()
    .then(function(){
      expect(100).toBe(100);
    });
  });

  describe("inside beforeEach", function(){

    var something = false;

    beforeEach(function(){
      return Promise.resolve()
      .then(function(){
        something = true;
      });
    });

    it("should wait for the beforeEach to be done", function(){
      expect(something).toBe(true);
    });

  });

  describe("inside because", function(){

    var something = false;

    because(function(){
      return Promise.resolve()
      .then(function(){
        something = true;
      });
    });

    it("should wait for the because to be done", function(){
      expect(something).toBe(true);
    });

  });

  describe("inside afterEach", function(){

    var something = false;

    afterEach(function(){
      return Promise.resolve()
      .then(function(){
        something = true;
      });
    });

    it("should run the afterEach after this test", function(){
      expect(something).toBe(false);
    });

    it("should wait for the afterEach to be done", function(){
      expect(something).toBe(true);
    });

  });

});