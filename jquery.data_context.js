/**
 * jQuery plugin to collect multiple data attributes into an object, using the data attribute
 *  names as keys.
 *  Looks up the DOM and collects all data attributes, but the deepest ones win.
 *
 *  Usage:
 *   $('<div data-product-id="1"></div>').dataContext(); // => {'product-id': '1'}
 *   $('<div data-a="1"><span data-b="2"></span></div>').find('span').dataContext()); // => {a: '1', b: '2'}
 */
(function ($) {

  $.fn.dataContext = function () {
    var o = {};
    var els = $.makeArray($(this).add($(this).parents())).reverse();
    for (var i = 0; i < els.length; i++) {
      $.extend(o, dataAttrs(els[i]));
    }
    return o;
  }

  function dataAttrs(el) {
    var o = {}, attrs = el.attributes || [];
    for (var i = 0; i < attrs.length; i++) {
      var names = /data\-(.*)/.exec(attrs[i].name);
      if (names) {
        o[names[1]] = attrs[i].value;
      }
    }
    return o;
  }

})(jQuery);
