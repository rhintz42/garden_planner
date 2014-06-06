describe("A suite", function() {
  it("contains spec with an expectation", function() {
    var t = new Terrain({addObjToScene: function(obj){}, addObjToLists: function(obj){}});
    expect(true).toBe(true);
  });
});
