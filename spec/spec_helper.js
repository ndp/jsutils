jasmine.Matchers.prototype.toBeDistinguishable = function() {
    var colors = this.actual;
    for (c in colors) {
        var hsl = colors[c].toHSL();
//        console.log('%o', hsl);
        if (hsl[1] < 50 || hsl[2] < 20 || hsl[2] > 70) {
            this.message = function() {
                return [
                    "Expected color " + colors[c] + " (" + hsl[0] + "," + hsl[1] + "," + hsl[2] + ") to have distinguishable saturation and lightness."
                ];
            };
            return false;
        }
    }
    return true;
};

jasmine.Matchers.prototype.toBeVisuallyClose = function(expected, threshold) {
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
        this.message = function() {
            return [
                "Color " + this.actual + " expected to be visually close to " + expected + ", but differed by HSV [" + diff[0] + "," + diff[1] + "," + diff[2] + "]."
            ];
        };
        return false;
    }
    return true;
}