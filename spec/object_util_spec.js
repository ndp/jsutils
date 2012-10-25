describe('ObjectUtil.unnestKeys', function () {
  it('should do nothing with empty object', function () {
    expect(ObjectUtil.unnestKeys({})).toEqual({});
  });
  it('should do nothing with unnested object', function () {
    expect(ObjectUtil.unnestKeys({a: 'A'})).toEqual({a: 'A'});
  });
  it('should unnested object', function () {
    expect(ObjectUtil.unnestKeys({'a[b]': 'c', d:'e'})).toEqual({a: {b: 'c'}, d: 'e'});
  });
  it('should unnested object', function () {
    expect(ObjectUtil.unnestKeys({'a[b]': 'c', d:'e', 'f[g]': 'h'})).toEqual({a: {b: 'c'}, d: 'e',f:{g:'h'}});
  });
  it('should unnested object with multiple properties', function () {
    expect(ObjectUtil.unnestKeys({'a[b]': 'c', 'a[d]':'e', 'a[f]': 'g'})).toEqual({a: {b: 'c', d: 'e',f:'g'}});
  });
});