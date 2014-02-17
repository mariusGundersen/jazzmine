describe("another describe with dependencies", [
  "Given/moduleA"
], function(
  moduleA
){
  
  it("should load the dependency", function(){
    expect(moduleA).toBeDefined();
  });

  it("should have the correct content", function(){
    expect(moduleA.name).toBe("moduleA");
  });

  describe("when editing the dependency", function(){

    because(function(){
      moduleA.name = "changed";
    });

    it("should have the changed content", function(){
      expect(moduleA.name).toBe("changed");
    });

  })

});