/*
 "Pin" the given element to the top of the page on vertical scroll.
 Also know as "conditional fixed placement".
 Copyright (c) 2013 NDP Software. Andrew J. Peterson
 see http://github.com/ndp/jsutils for tests, etc.

 Usage:
 $('#menu').fixie({ topMargin: '20px' });

 There are various strategies available:
 * relative: simply make the element positioned relative and
   adjust position. Works with simple elements
 * relativeWithHiding: same as above, except fades out and shows
   elements as they move
 * fixed: makes the element fixed positioned.  TODO: insert
   placeholder element

 See $.fn.fixie.defaults for other options.
 */

  // Simple throttle function-decorator.
(function ($) {
  var throttle = function (fn, milliseconds) {
    var ctx = this,
        timeout = null,
        lastCallAt = (new Date()).valueOf() - milliseconds;

    return function () {
      var args = Array.prototype.slice.call(arguments);
      var now = (new Date()).valueOf();
      if ((now - lastCallAt) >= milliseconds) {
        fn.apply(ctx, args);
        lastCallAt = now;
      }

      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        fn.apply(ctx, args);
        lastCallAt = (new Date()).valueOf();
      }, milliseconds);
    }
  };

  var beforeAndAfter = function (beforeFn, afterFn, milliseconds) {
    var ctx = this, timeout = null;

    return function () {
      var args = Array.prototype.slice.call(arguments);
      if (!timeout) {
        beforeFn.apply(ctx, args);
      }
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        afterFn.apply(ctx, args);
        timeout = null;
      }, milliseconds);
    }
  };


  $.fn.fixie = function (options) {

    var config = $.extend({}, $.fn.fixie.defaults, options);

    var $target = $(this);
    var margin = $target.position().top - (config.topMargin || 0);

    var strategies = {
      relative: function () {
        $target.css('position', 'relative');
        var moveIt = function (e) {
          var top = Math.max(0, window.scrollY - margin);
          $target.css('top', top).toggleClass(config.pinnedClass, top > 0);
        }
        $(window).on('scroll', throttle(moveIt, config.throttle));
      },
      relativeWithHiding: function () {
        $target.css('position', 'relative');
        var hideIt = function (e) {
          $target.stop(true, false).animate({'opacity': 0.01}, 0.05);
        }
        var moveIt = function (e) {
          var top = Math.max(0, window.scrollY - margin);
          $target.css('top', top).toggleClass(config.pinnedClass, top > 0);
          $target.stop(true, false).animate({'opacity': 1.0}, 'fast', false, false);
        }
        $(window).on('scroll', beforeAndAfter(hideIt, moveIt, config.throttle));
      },
      fixed: function () {
        var fixIt = function () {
          if (window.scrollY > margin) {
            $target.css({position: 'fixed', top: config.topMargin || 0}).
                addClass(config.pinnedClass);
          } else
            $target.css({position: 'relative', top: 0}).
                removeClass(config.pinnedClass);
        }
        $(window).on('scroll', throttle(fixIt, config.throttle));
      }
    }

    strategies[config.strategy]();
    return this;
  };


  $.fn.fixie.defaults = {
    strategy: 'relative',
    topMargin: 0,
      // how close to the top to pin it?
    pinnedClass: '_pinnedToTop',
      // any css class to add on when pinned
    throttle: 30
      // how often to adjust position of element
  };

})();
})(jQuery);

