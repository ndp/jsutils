// two colors are distinguishable
jasmine.Matchers.prototype.toBeDistinguishable = function () {
  var i, c0, c1, hsl0, hsl1, diff, colors = this.actual;

  if (colors.length < 2) {
    this.message = function () {
      return [
        "Expected two or more colors."
      ];
    };
    return false;
  }

  for (i = 0; i < (colors.length - 1); i++) {
    c0 = colors[i];
    c1 = colors[i + 1];
    hsl0 = c0.toHSL();
    hsl1 = c1.toHSL();
//        console.log('%o', hsl);

    diff = Math.abs(hsl0[0] - hsl1[0]) + Math.abs(hsl0[1] - hsl1[1]) + Math.abs(hsl0[2] - hsl1[2]);
    if (diff < 30) {
      this.message = function () {
        return [
          "Expected color #" + i + " " + c0 + " (" + hsl0[0] + "," + hsl0[1] + "," + hsl0[2] + ") to be distinguishable from " +
              "color #" + (i + 1) + " " + c1 + " (" + hsl1[0] + "," + hsl1[1] + "," + hsl1[2] + ") " +
              "have distinguishable saturation and lightness."
        ];
      };
      return false;
    }
  }
  return true;
};

jasmine.Matchers.prototype.toBeVisuallyClose = function (expected, threshold) {
  if (typeof threshold == 'undefined') threshold = 8;
  var expectedHsl = expected.toHSL();
  var actualHsl = this.actual.toHSL();
  var diff = [];
  for (var d in actualHsl) diff.push(Math.abs(expectedHsl[d] - actualHsl[d]));

  var diffTotal = 0;
  for (d in diff) {
    diffTotal += diff[d];
    if (d == 0) diffTotal /= 3.6;
  }

  if (diffTotal > threshold * 3) {
    this.message = function () {
      return [
        "Color " + this.actual + " expected to be visually close to " + expected + ", but differed by HSV [" + diff[0] + "," + diff[1] + "," + diff[2] + "]."
      ];
    };
    return false;
  }
  return true;
}