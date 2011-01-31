describe('ColorFactory', function() {

    function render(colorsOrCode, label) {
        var colors = colorsOrCode;
        if (typeof colorsOrCode == 'string') {
            colors = eval(colorsOrCode)
        }
        var $holder = $('<div>').css({position: 'relative', height:35,'float':'left',clear: 'left'}).appendTo($('body'));
        var $swatches = $('<div>').css({width: 280}).appendTo($holder);
        for (c in colors) {
            $('<div>').css({marginLeft: -1,height:30,width:30,backgroundColor:colors[colors.length - c - 1],'float':'right',border:'1px solid #555'}).appendTo($swatches);
        }
        if (colors != colorsOrCode) {
            $('<code>').css({position: 'absolute', left: 300, backgroundColor: '#f6f6f6',lineHeight: '15px', height:15,width:500,fontSize: 'small','float':'left'}).text(colorsOrCode).appendTo($holder);
        }
        $('<div>').css({position: 'absolute', left: 300, top: 15, height:15,width:200,fontSize: 'x-small','float':'left'}).text(label || '').appendTo($holder);

        return colors;
    }


    describe('primaryColors', function() {
        it('should yellow, red, blue', function() {
            var colors = render('ColorFactory.primaryColors()','primary colors');
            expect(colors.length).toEqual(3);
            expect(colors[0]).toBeVisuallyClose('yellow');
            expect(colors[1]).toBeVisuallyClose('red');
            expect(colors[2]).toBeVisuallyClose('blue');
        });
    });

    describe('primaryAndSecondaryColors', function() {
        it('should yellow, orange, red, purple, blue, green', function() {
            var colors = render("ColorFactory.primaryAndSecondaryColors()",'primary colors');
            expect(colors.length).toEqual(6);
            expect(colors[0]).toBeVisuallyClose('yellow');
            expect(colors[1]).toBeVisuallyClose('Orange');
            expect(colors[2]).toBeVisuallyClose('red');
            expect(colors[3]).toBeVisuallyClose('#90f');
            expect(colors[4]).toBeVisuallyClose('blue');
            expect(colors[5]).toBeVisuallyClose('#0f6');
        });
    });


    describe('complementaryColors', function() {
        it('should find complement to red', function() {
            var colors = render("ColorFactory.complementary('#ff0000')",'complementary red');
//            expect(color[0]).toBeVisuallyClose('#08d16b');
            expect(colors[0]).toBeVisuallyClose('#00ffff');
        });
        it('should find complement to red', function() {
            var colors = render("ColorFactory.complementary('#0338ff')",'complementary #0338ff');
            expect(colors[0]).toBeVisuallyClose('#ff9d04');
        });
        it('should find complement to #9e01d6', function() {
            var colors = render("ColorFactory.complementary('#9e01d6')",'complementary #9e01d6');
//            expect(colors[0]).toBeVisuallyClose('#3ad501');
            expect(colors[0]).toBeVisuallyClose('#97fe03');
        });
    });

    describe('analogous', function() {
        $.each([
            ['#6d00ff','#0000ff','#0090ff'],
            ['#ff7400','#ff0000','#cd0074'],
            ['#9fee00','#ffff00','#ffd300'],
            ['#04FC58','#96fe04','#EAFF04'],
            ['#FE0435','#FC04C5','#8B16FB'],
            ['#FF7590','#FD74DF','#BF7EFD'],
            ['#1B71FB','#04FBD1','#38FD04']
        ], function(index, item) {
            it('should produce analogous colors from ' + item[1], function() {
                var colors = render("ColorFactory.analogous('"+item[1]+"')",'analogous');
                expect(colors.length).toEqual(3);
                expect(colors[0]).toBeVisuallyClose(item[0]);
                expect(colors[1]).toBeVisuallyClose(item[1]);
                expect(colors[2]).toBeVisuallyClose(item[2]);
            });
        });
        it('should produce analogous colors 04FBD1, 10°', function() {
            var colors = render("ColorFactory.analogous('#04FBD1', 10)",'analogous');
            expect(colors.length).toEqual(3);
            expect(colors[1]).toBeVisuallyClose('#04FBD1');
            expect(colors[0]).toBeVisuallyClose('#0BCDFA');
            expect(colors[2]).toBeVisuallyClose('#04FB91');
        });
        it('should produce analogous colors 04FBD1, 80°', function() {
            var colors = render("ColorFactory.analogous('#04FBD1', 80)",'analogous');
            expect(colors.length).toEqual(3);
            expect(colors[1]).toBeVisuallyClose('#04FBD1');
            expect(colors[0]).toBeVisuallyClose('#7A19FB');
            expect(colors[2]).toBeVisuallyClose('#EFFF04');
        });
    });


    describe('interpolate', function() {
        it('should do nothing is passed one color', function() {
            var colors = render("ColorFactory.interpolate('#e6e6e6', '#e6e6e6', 2)",'interpolate');
            expect(colors.length).toEqual(2);
            expect(colors[0]).toBeVisuallyClose('#e6e6e6');
            expect(colors[1]).toBeVisuallyClose('#e6e6e6');
        });

        it('should do nothing is passed two colors', function() {
            var colors = render("ColorFactory.interpolate('#e6e6e6', '#bbbbbb', 2)",'interpolate between 2 colors');
            expect(colors.length).toEqual(2);
            expect(colors[0]).toBeVisuallyClose('#e6e6e6');
            expect(colors[1]).toBeVisuallyClose('#bbbbbb');
        });

        it('should find medium gray', function() {
            var colors = render("ColorFactory.interpolate('#000000', '#ffffff', 3)",'interpolate medium gray');
            expect(colors.length).toEqual(3);
            expect(colors[0]).toBeVisuallyClose('#000000');
            expect(colors[1]).toBeVisuallyClose('#999999');
            expect(colors[2]).toBeVisuallyClose('#ffffff');
        });

        it('should find many grays', function() {
            var colors = render("ColorFactory.interpolate('#000000', '#ffffff', 6)",'interpolate many grays');
            expect(colors.length).toEqual(6);
            expect(colors[0]).toBeVisuallyClose('#000000');
            expect(colors[1]).toBeVisuallyClose('#333333');
            expect(colors[2]).toBeVisuallyClose('#666666');
            expect(colors[3]).toBeVisuallyClose('#999999');
            expect(colors[4]).toBeVisuallyClose('#cccccc');
            expect(colors[5]).toBeVisuallyClose('#ffffff');
        });
        it('should interpolate hues', function() {
            var colors = render("ColorFactory.interpolate('red', 'blue', 3)",'interpolate hues');
            expect(colors[1]).toBeVisuallyClose('#00ff00');
        });
        it('should interpolate saturation', function() {
            var colors = render("ColorFactory.interpolate('#ff0000', '#996666', 3)",'interpolate saturation');
            expect(colors[1]).toBeVisuallyClose('#cc3333');
        });
        it('should interpolate lightness', function() {
            var colors = render("ColorFactory.interpolate('#ff0000', '#ffffff', 5)",'interpolate lightness');
            expect(colors[2]).toBeVisuallyClose('#df9f9f');
        });

    });


    describe('qualitative()', function() {
        it('should reproduce example', function() {
            var colors = render("ColorFactory.qualitative('#80b696', 3)",'qualitative example');
            expect(colors).toBeDistinguishable();
//            expect(colors[0]).toBeVisuallyClose('#80b696');
//            expect(colors[1]).toBeVisuallyClose('#84a0c0');
//            expect(colors[2]).toBeVisuallyClose('#de68a6');
            //expect(colors).toEqual('#80b696', '#84a0c0', '#de68a6')
        });
        it('should return 5 saturated colors when asked', function() {
            var colors = render("ColorFactory.qualitative('red', 5)",'qualitative 5 saturated colors');
            expect(colors).toBeDistinguishable();
        });
        it('should be able to start from white', function() {
            var colors = render("ColorFactory.qualitative('white', 5)",'qualitative from white');
            expect(colors).toBeDistinguishable();
        });
        it('should be able to start from black', function() {
            var colors = render("ColorFactory.qualitative('black', 4)",'qualitative from black');
            expect(colors).toBeDistinguishable();
        });
        it('should be able to start with no color', function() {
            var colors = render("ColorFactory.qualitative(6)",'qualitative from no color');
            expect(colors).toBeDistinguishable();
        });
        it('should return 9 colors when asked', function() {
            var colors = render("ColorFactory.qualitative('red'.saturate(-20).lighten(20), 9)",'qualitative 9 colors');
            expect(colors).toBeDistinguishable();
            expect(colors.length).toEqual(9);
        });
    });

    describe('sequential', function() {
        it('should reproduce example gray', function() {
            var colors = render("ColorFactory.sequential('#e6e6e6', 4)",'sequential #e9e9e9');
            expect(colors.length).toEqual(4);
            expect(colors[0]).toBeVisuallyClose('#e6e6e6');
            expect(colors[1]).toBeVisuallyClose('#b3b3b3');
            expect(colors[2]).toBeVisuallyClose('#5d5d5d');
            expect(colors[3]).toBeVisuallyClose('#202020');
        });

        it('should reproduce example purple', function() {
            var colors = render("ColorFactory.sequential('#c4b3d8', '#240d5e', 3)",'sequential purple example');
            expect(colors.length).toEqual(3);
            expect(colors[0]).toBeVisuallyClose('#c4b3d8');
            expect(colors[1]).toBeVisuallyClose('#7c67ab', 25);
            expect(colors[2]).toBeVisuallyClose('#240d5e');
        });

        it('should work from dark purple lighter', function() {
            var colors = render("ColorFactory.sequential('#240d5e', 7)",'sequential dark purple');
            expect(colors[0]).toBeVisuallyClose('#240d5e');
            expect(colors[2]).toBeVisuallyClose('#4519b5');
            expect(colors[4]).toBeVisuallyClose('#764ae6');
            expect(colors[6]).toBeVisuallyClose('#b8a1f2');
        });

        it('should work from light purple darker', function() {
            var colors = render("ColorFactory.sequential('#c4b3d8', 7)",'sequential light purple');
            expect(colors[0]).toBeVisuallyClose('#c4b3d8');
            expect(colors[2]).toBeVisuallyClose('#7c67ab');
            expect(colors[4]).toBeVisuallyClose('#66478a');
            expect(colors[6]).toBeVisuallyClose('#39284d');
        });

        it('should reproduce example orange', function() {
            var colors = render("ColorFactory.sequential('#ffcc80', '#b30000', 3)",'sequential orange example');
            expect(colors.length).toEqual(3);
            expect(colors[0]).toBeVisuallyClose('#ffcc80');
            expect(colors[1]).toBeVisuallyClose('#f35926');
            expect(colors[2]).toBeVisuallyClose('#b30000');
        });

    });

    describe('binary', function() {
        it('should reproduce example gray', function() {
            var colors = render("ColorFactory.binary('#a6a6a6')",'binary gray');
            expect(colors[0]).toBeVisuallyClose('#a6a6a6');
            expect(colors[1]).toBeVisuallyClose('#e6e6e6');
        });
        it('should reproduce example green', function() {
            var colors = render("ColorFactory.binary('#80b696')",'binary green');
            expect(colors[0]).toBeVisuallyClose('#80b696');
            expect(colors[1]).toBeVisuallyClose('#cce8d7');
        });
        it('should reproduce example pink', function() {
            var colors = render("ColorFactory.binary('#de68a6')",'binary pink');
            expect(colors[0]).toBeVisuallyClose('#de68a6');
            expect(colors[1]).toBeVisuallyClose('#fbb4d9', 15);
        });
    });


});