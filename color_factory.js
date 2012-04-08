// Copyright (c) 2010-2012 Andrew J. Peterson / NDP Software. All Rights Reserved.

var ColorFactory = {
  sixHexDigits: 0xffffff,

  primaryColors: function () {
    return ['#ff0', '#ff0000', '#0000ff'];
  },

  primaryAndSecondaryColors: function () {
    return ['#ff0', '#f90', '#f00', '#90f', '#00f', '#0f6'];
  },

  complementary: function (color) {
    var hsl = color.toHSL();
    hsl[0] = (hsl[0] + 180) % 360;
    return [ColorHelper.hslToHexColor(hsl), color];
  },

  // two adjacent colors on 12-part color wheel
  analogous: function (color, angle) {
    if (!angle) angle = 30;
    var hsl = ColorHelper.rgbToHSL(color);
    hsl[0] = (hsl[0] + angle) % 360;
    var color0 = ColorHelper.hslToHexColor(hsl).darken(8).saturate(-6);
    var hsl = ColorHelper.rgbToHSL(color);
    hsl[0] = (hsl[0] - angle + 360) % 360;
    var color2 = ColorHelper.hslToHexColor(hsl);
    return [color0, color, color2];
  },

  random: function () {
    // even distribution within (0,0xffffff)
    var c = Math.round((Math.random() + ColorFactory.sixHexDigits) + (ColorFactory.sixHexDigits + 1)).toString(16);
    c = c.substr(c.length - 6, 6);
    return '#' + c;
  },
  randomGray: function () {
    return ColorFactory.random().saturate(-100);
  },
  randomHue: function (s, l) {
    var h = Math.round(Math.random() * 256);
    return ColorHelper.hslToHexColor(h, s, l);
  },
  interpolate: function (color1, colorN, steps) {
    var hsl1 = ColorHelper.rgbToHSL(color1);
    var hslN = ColorHelper.rgbToHSL(colorN);
    var delta = [];
    for (var d in hsl1) {
      delta.push((hslN[d] - hsl1[d]) / (steps - 1));
    }

    var hsl = hsl1;
    var colors = [];
    for (var i = 0; i < steps; i++) {
      colors.push(ColorHelper.hslToHexColor(hsl));
      for (d in hsl) {
        hsl[d] += delta[d];
      }
    }
    return colors;
  },


  // http://www.personal.psu.edu/cab38/ColorSch/Schemes.html
  /**
   * Qualitative schemes do not imply magnitude differences between legend classes,
   * and hues are used to create the primary visual differences between classes.
   * Qualitative schemes are best suited to representing nominal or categorical data.
   * @param refColor (optional)
   * @param count
   */
  qualitative: function (refColor, count) {
    if (typeof count == 'undefined' && typeof refColor == 'number') {
      count = refColor;
      refColor = 'black';
    }
    var hsl = ColorHelper.rgbToHSL(refColor);
    hsl[1] = Math.max(60, hsl[1]);
    hsl[2] = Math.max(40, hsl[2]);
    hsl[2] = Math.min(70, hsl[2]);
    var colors = [];
    for (var i = 0; i < count; i++) {
      colors.push(ColorHelper.hslToHexColor(hsl));
      hsl[0] += (360 / count);
      hsl[0] %= 360;
    }
    return colors;
  },

  /**
   * Sequential schemes are suited to ordered data that progress from low to high.
   * Lightness steps dominate the look of these schemes, with light colors
   * for low data values to dark colors for high data values.
   * @param startColor
   * @param endColor (optional)
   * @param count
   */
  sequential: function (startColor, endColor, count) {
    var hsl = ColorHelper.rgbToHSL(startColor);
    if (typeof count == 'undefined') {
      count = endColor;
      var lightness = hsl[2] - 20 * count;
      if (lightness < 0) lightness = 100 - hsl[2];
      endColor = ColorHelper.hslToHexColor([hsl[0], hsl[1], lightness]);
    }
    return ColorFactory.interpolate(startColor, endColor, count);

  },
  binary: function (trueColor) {
    return [trueColor, trueColor.saturate(10).lighten(25)];
  },

  /**
   * Diverging schemes put equal emphasis on mid-range critical values and
   * extremes at both ends of the data range.
   * The critical class or break in the middle of the legend is
   * emphasized with light colors and low and high extremes are
   * emphasized with dark colors that have contrasting hues.
   * @param startColor
   * @param count
   */
  diverging: function (startColor, count) {

  }
// diverge(array) => [[],[],[]]
// binary(array) =>
}

