describe('ArrayUtil.toObject', function () {
  it("should return empty object", function () {
    expect(ArrayUtil.toObject([])).toEqual({});
  });
  it("should return single field", function () {
    expect(ArrayUtil.toObject([
      {name: 'a', value: 'A'}
    ])).toEqual({a: 'A'});
  });
  it("should return allow override of key and value fields", function () {
    expect(ArrayUtil.toObject([
      {nomo: 'a', valu: 'A'}
    ],'nomo','valu')).toEqual({a: 'A'});
  });
  it("should return two fields", function () {
    expect(ArrayUtil.toObject([
      {name: 'a', value: 'A'},
      {name: 'b', value: 'B'}
    ])).toEqual({a: 'A', b: 'B'});
  });
  it("should unnest  fields", function () {
    expect(ArrayUtil.toObject([
      {name: 'a[prime]', value: 'p'}
    ])).toEqual({a: {prime: 'p'}});
  });
});


