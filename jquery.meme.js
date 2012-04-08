(function($) {

    $.fn.meme = function(options) {

        var $this = $(this),
                imgSrc = options.img, h, w,
                img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = options.img;
        img.onload = function() {
            w = img.width;
            h = img.height;
            $this.trigger('draw');
        };


        var topText = options.topText;
        var bottomText = options.bottomText;

        $this.bind({
            draw: function() {
                $this.empty();
                var $canvas = $('<canvas>').attr('width', w).attr('height', h).appendTo($this);
                var ctx = $canvas[0].getContext('2d');
                ctx.drawImage(img, 0, 0);

                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.textShadow = ''
                ctx.textBaseline = "top";
                var opts = { fontFamily: 'Calibri, Arial', text: topText || '', maxFontSize: 50, minFontSize: 25, width: w};
                shrinkToFit(ctx, opts);
                var text = opts.text.split("\r");
                ctx.fillText(text[0] || '', w / 2, 0, w);
                ctx.fillText(text[1] || '', w / 2, opts.fontSize * 1.1, w);

                opts.text = bottomText;
                delete opts.fontSize;
                shrinkToFit(ctx, opts);
                var text = opts.text.split("\r");
                while (text.length < 2) text.unshift('');
                ctx.textBaseline = "bottom";
                ctx.fillText(text[0] || '', w / 2, h - opts.fontSize * 1.1, w);
                ctx.fillText(text[1] || '', w / 2, h, w);
            },
            setTopText: function(event, t) {
                topText = t;
                $this.trigger('draw');
            },
            setBottomText: function(event, t) {
                bottomText = t;
                $this.trigger('draw');
            }
        });

        return this;
    }


    // Input and modifies: text: x, maxFontSize (px), minFontSize (px), width (px).
    // Inserts \r in text if it's too wide to fit in one line.
    function shrinkToFit(ctx, opts) {
        opts.text = opts.text || '';
        opts.fontSize = opts.fontSize || opts.maxFontSize;
        opts.minFontSize = opts.minFontSize || opts.fontSize;
        opts.maxFontSize = opts.maxFontSize || opts.fontSize;

        function setFont() {
            ctx.font = '' + opts.fontSize + 'pt ' + opts.fontFamily;
        }

        function widthOf(t) {
            return ctx.measureText(t).width
        }

        for (; opts.fontSize >= opts.minFontSize; opts.fontSize--) {
            setFont();
            if (widthOf(opts.text) <= opts.width) return;
        }

        // Doesn't fit in one line
        // Split in two, and loop again
        opts.fontSize = opts.maxFontSize;
        setFont();
        var t0 = [], t1 = opts.text.split(' ');
        while (t1.length > 0 && widthOf(t0.join(' ')) < widthOf(t1.join(' '))) {
            t0.push(t1.shift());
        }

        opts.text = t0.join(' ') + "\r" + t1.join(' ');
        for (; opts.fontSize >= opts.minFontSize; opts.fontSize--) {
            setFont();
            if (widthOf(t0.join(' ')) <= opts.width) return;
        }
    }


})(jQuery);
