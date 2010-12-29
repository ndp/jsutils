describe('ColorFactory', function() {

    function render(colors) {
        $('<div>').css({height:20,width:2,backgroundColor:'black','float':'left',clear: 'left'}).appendTo($('body'));
        for (c in colors) {
            $('<div>').css({height:20,width:20,backgroundColor:colors[c],'float':'left'}).appendTo($('body'));
        }
    }

    describe('interpolate', function() {
        it('should do nothing is passed one color', function() {
            var colors = ColorFactory.interpolate('#e6e6e6', '#e6e6e6', 2);
            expect(colors.length).toEqual(2);
            expect(colors[0]).toBeVisuallyClose('#e6e6e6');
            expect(colors[1]).toBeVisuallyClose('#e6e6e6');
            render(colors);
        });

        it('should do nothing is passed two colors', function() {
            var colors = ColorFactory.interpolate('#e6e6e6', '#bbbbbb', 2);
            expect(colors.length).toEqual(2);
            expect(colors[0]).toBeVisuallyClose('#e6e6e6');
            expect(colors[1]).toBeVisuallyClose('#bbbbbb');
            render(colors);
        });

        it('should find medium gray', function() {
            var colors = ColorFactory.interpolate('#000000', '#ffffff', 3);
            expect(colors.length).toEqual(3);
            expect(colors[0]).toBeVisuallyClose('#000000');
            expect(colors[1]).toBeVisuallyClose('#999999');
            expect(colors[2]).toBeVisuallyClose('#ffffff');
            render(colors);
        });

        it('should find many grays', function() {
            var colors = ColorFactory.interpolate('#000000', '#ffffff', 6);
            expect(colors.length).toEqual(6);
            expect(colors[0]).toBeVisuallyClose('#000000');
            expect(colors[1]).toBeVisuallyClose('#333333');
            expect(colors[2]).toBeVisuallyClose('#666666');
            expect(colors[3]).toBeVisuallyClose('#999999');
            expect(colors[4]).toBeVisuallyClose('#cccccc');
            expect(colors[5]).toBeVisuallyClose('#ffffff');
            render(colors);
        });
        it('should interpolate hues', function() {
            var colors = ColorFactory.interpolate('red', 'blue', 3);
            expect(colors[1]).toBeVisuallyClose('#00ff00');
            render(colors);
        });
        it('should interpolate saturation', function() {
            var colors = ColorFactory.interpolate('#ff0000', '#996666', 3);
            expect(colors[1]).toBeVisuallyClose('#cc3333');
            render(colors);
        });
        it('should interpolate lightness', function() {
            var colors = ColorFactory.interpolate('#ff0000', '#ffffff', 5);
            expect(colors[2]).toBeVisuallyClose('#df9f9f');
            render(colors);
        });

    });


    describe('qualitative()', function() {
        it('should reproduce example', function() {
            var colors = ColorFactory.qualitative('#80b696', 3);
            expect(colors).toBeDistinguishable();
//            expect(colors[0]).toBeVisuallyClose('#80b696');
//            expect(colors[1]).toBeVisuallyClose('#84a0c0');
//            expect(colors[2]).toBeVisuallyClose('#de68a6');
            //expect(colors).toEqual('#80b696', '#84a0c0', '#de68a6')
            render(colors);
        });
        it('should return 5 saturated colors when asked', function() {
            var colors = ColorFactory.qualitative('red', 5);
            expect(colors).toBeDistinguishable();
            render(colors);
        });
        it('should be able to start from white', function() {
            var colors = ColorFactory.qualitative('white', 5);
            expect(colors).toBeDistinguishable();
            render(colors);
        });
        it('should be able to start from black', function() {
            var colors = ColorFactory.qualitative('black', 4);
            expect(colors).toBeDistinguishable();
            render(colors);
        });
        it('should be able to start with no color', function() {
            var colors = ColorFactory.qualitative(6);
            expect(colors).toBeDistinguishable();
            render(colors);
        });
        it('should return 9 colors when asked', function() {
            var colors = ColorFactory.qualitative('red'.saturate(-20).lighten(20), 9);
            expect(colors).toBeDistinguishable();
            expect(colors.length).toEqual(9);
            render(colors);
        });
    });

    describe('sequential', function() {
        it('should reproduce example gray', function() {
            var colors = ColorFactory.sequential('#e6e6e6', 4);
            expect(colors.length).toEqual(4);
            expect(colors[0]).toBeVisuallyClose('#e6e6e6');
            expect(colors[1]).toBeVisuallyClose('#b3b3b3');
            expect(colors[2]).toBeVisuallyClose('#5d5d5d');
            expect(colors[3]).toBeVisuallyClose('#202020');
            render(colors);
        });

        it('should reproduce example purple', function() {
            var colors = ColorFactory.sequential('#c4b3d8', '#240d5e', 3);
            expect(colors.length).toEqual(3);
            expect(colors[0]).toBeVisuallyClose('#c4b3d8');
            expect(colors[1]).toBeVisuallyClose('#7c67ab', 25);
            expect(colors[2]).toBeVisuallyClose('#240d5e');
            render(colors);
        });

        it('should work from dark purple lighter', function() {
            var colors = ColorFactory.sequential('#240d5e', 4);
            expect(colors[0]).toBeVisuallyClose('#240d5e');
            expect(colors[1]).toBeVisuallyClose('#4519b5');
            expect(colors[2]).toBeVisuallyClose('#764ae6');
            expect(colors[3]).toBeVisuallyClose('#b8a1f2');
            render(colors);
        });

        it('should work from light purple darker', function() {
            var colors = ColorFactory.sequential('#c4b3d8', 4);
            expect(colors[0]).toBeVisuallyClose('#c4b3d8');
            expect(colors[1]).toBeVisuallyClose('#7c67ab');
            expect(colors[2]).toBeVisuallyClose('#66478a');
            expect(colors[3]).toBeVisuallyClose('#39284d');
            render(colors);
        });

        it('should reproduce example orange', function() {
            var colors = ColorFactory.sequential('#ffcc80', '#b30000', 3);
            expect(colors.length).toEqual(3);
            expect(colors[0]).toBeVisuallyClose('#ffcc80');
            expect(colors[1]).toBeVisuallyClose('#f35926');
            expect(colors[2]).toBeVisuallyClose('#b30000');
            render(colors);
        });

    });

    describe('binary', function() {
        it('should reproduce example gray', function() {
            var colors = ColorFactory.binary('#a6a6a6');
            expect(colors[true]).toBeVisuallyClose('#a6a6a6');
            expect(colors[false]).toBeVisuallyClose('#e6e6e6');
            render(colors);
        });
        it('should reproduce example green', function() {
            var colors = ColorFactory.binary('#80b696');
            expect(colors[true]).toBeVisuallyClose('#80b696');
            expect(colors[false]).toBeVisuallyClose('#cce8d7');
            render(colors);
        });
        it('should reproduce example pink', function() {
            var colors = ColorFactory.binary('#de68a6');
            expect(colors[true]).toBeVisuallyClose('#de68a6');
            expect(colors[false]).toBeVisuallyClose('#fbb4d9', 15);
            render(colors);
        });
    });


});