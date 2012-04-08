function hashDiff(h1, h2) {
  var d = {};
  for (k in h2) {
    if (h1[k] !== h2[k]) d[k] = h2[k];
  }
  return d;
}


describe('hashDiff()', function() {
  it('should return {} for empty hash',function() {
    expect(hashDiff({},{})).toEqual({});
  });
  it('should return {} for equivalent hashes',function() {
    expect(hashDiff({a:1,b:2,c:3},{a:1,b:2,c:3})).toEqual({});
  });
  it('should return {} for empty hash',function() {
    expect(hashDiff({a:1,b:2,c:3},{a:1,b:3,c:3})).toEqual({b:3});
  });
});

