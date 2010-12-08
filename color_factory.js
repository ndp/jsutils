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
            return Csster.hslToHexColor(h, s, l);
        },
        interpolate: function(color1, colorN, steps) {
            var hsl1 = color1.toHSL();
            var hslN = colorN.toHSL();
            var colors = [];
            for (var i = 0; i < steps; i++) {
                var hsl = hsl1;
                for (var j = 0; j < 3; j++) {
                    hsl[j] = hsl1[j] + i / steps * (hslN[j] - hsl1[j]);
                }
                colors.push(Csster.hslToHexColor(hsl));
            }
            return colors;
        }
    };
}

