// Copyright (c) 2010 Andrew J. Peterson / NDP Software. All Rights Reserved.
if (typeof ColorFactory == 'undefined') {

    ColorFactory = {
        sixHexDigits: 0xffffff,
        random: function() {
            // even distribution within (0,0xffffff)
            var c = Math.round((Math.random() + ColorFactory.sixHexDigits) + (ColorFactory.sixHexDigits + 1)).toString(16);
            c = c.substr(c.length - 6, 6);
            return '#' + c;
        },
        randomGray: function() {
            return ColorFactory.random().saturate(-100);
        },
        randomHue: function(s, l) {
            h = Math.round(Math.random() * 256);
            return ColorHelper.hslToHexColor(h, s, l);
        },
        interpolate: function(color1, colorN, steps) {
            var hsl1 = color1.toHSL();
            var hslN = colorN.toHSL();
            var delta = [];
            for (var d in hsl1) {
                delta.push( (hslN[d] - hsl1[d]) / (steps - 1));
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
        qualitative: function(refColor, count) {
            if (typeof count == 'undefined' && typeof refColor == 'number') {
                count = refColor;
                refColor = 'black';
            }
            var hsl = refColor.toHSL();
            hsl[1] = Math.max(60,hsl[1]);
            hsl[2] = Math.max(40,hsl[2]);
            hsl[2] = Math.min(70,hsl[2]);
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
        sequential: function(startColor, endColor, count) {
            var hsl = startColor.toHSL();
            if (typeof count == 'undefined') {
                count = endColor;
                var lightness = hsl[2] - 20 * count;
                if (lightness < 0) lightness = 100 - hsl[2];
                endColor = ColorHelper.hslToHexColor([hsl[0],hsl[1],lightness]);
            }
            return ColorFactory.interpolate(startColor, endColor, count);

        },
        binary: function(trueColor) {
            var colors = {true: trueColor, false: trueColor.saturate(10).lighten(25)};
            return colors;
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
        diverging: function(startColor, count) {

        }
        // diverge(array) => [[],[],[]]
        // binary(array) =>
    };
}

