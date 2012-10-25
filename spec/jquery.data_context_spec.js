
describe('data_context', function () {
  it("returns empty object when no data attributes", function () {
    expect($('<div></div>').dataContext()).toEqual({});
  });
  it("creates object with key/value of attribute of an element", function () {
    expect($('<div data-product-id="1"></div>').dataContext()).toEqual({'product-id': '1'});
  });
  it("creates object with keys/values of attributes of an element", function () {
    expect($('<div data-a="1" data-b="2"></div>').dataContext()).toEqual({a: '1', b: '2'});
  });
  it("creates object with attributes from its parent", function () {
    expect($('<div data-a="1"><span></span></div>').find('span').dataContext()).toEqual({a: '1'});
  });
  it("combines attributes from its parent", function () {
    expect($('<div data-a="1"><span data-b="2"></span></div>').find('span').dataContext()).toEqual({a: '1', b: '2'});
  });
  it("overrides attributes from its parent", function () {
    expect($('<div data-a="1" data-b="2"><span data-b="3"></span></div>').find('span').dataContext()).toEqual({a: '1', b: '3'});
  });
});
