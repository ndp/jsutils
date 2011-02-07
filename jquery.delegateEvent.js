(function($) {
    $.fn.bindAndDelegate = function(evt, target, newEvent) {
        this.bind(evt, function(e) {
           $(target).trigger(newEvent || evt); 
        });
    };

})(jQuery);