/*
Simple jQuery plugin to forward events from one element to a new
target. Optionally provide a new event name.

Usage:
$('#id').bindAndDelegate('click',$('#other'));
$('#id').bindAndDelegate('click',$('#other'),'id-clicked'); // new event

 */
(function($) {
    $.fn.bindAndDelegate = function(evt, target, newEvent) {
        this.bind(evt, function(e) {
           $(target).trigger(newEvent || evt); 
        });
    };
})(jQuery);