describe('truncateString', function () {
  it("should throw exception if missing a string parameter", function () {
    expect(
        function () {
          truncateString(undefined, 1);
        }).toThrow();
  });
  it("should throw exception if missing a length parameter", function () {
    expect(
        function () {
          truncateString('abc');
        }).toThrow();
  });
  it("should return input if within range", function () {
    var sample = 'abcdef';
    expect(truncateString(sample, sample.length)).toEqual(sample);
    expect(truncateString(sample, sample.length + 1)).toEqual(sample);
    expect(truncateString(sample, sample.length + 1000)).toEqual(sample);
  });
  it("should leave length always under requested value", function () {
    var sample = 'abcdef';
    var len = sample.length;
    while (--len > 0) {
      expect(truncateString(sample, len).length).not.toBeGreaterThan(len);
    }
  });

});