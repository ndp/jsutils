Various javascript utilities that don't (yet) warrant packaging on their own.


## color_helpers.js

Utilities to perform color math and manipulation. Extracted from Csster.

*  <code>"#ab342c".darken(%)</code> -- make color darker by given percent
*  <code>"#ab342c".lighten(%)</code> -- make color lighter by given percent
*  <code>"#ab342c".saturate(%)</code>  -- make color more saturated by given percent. To *desaturate*, use negative values for the percent. Note that <code>"#ab342c".saturate(-100)</code> renders in grayscale.

There are also color conversion routines if you want to build your own manipulation.

*  <code>"blue".toHexColor()</code>
*  <code>"#9cf".toHexColor()</code>
*  <code>"#ab342c".toHexColor()</code> (no-op)
*  <code>"#ab342c".toRGB()</code>  converts to array of three values, 0 - 255
*  <code>"#ab342c".toHSL()</code> returns an array of hue, saturation and lightness. Hue is a range from 0-360, while the others are from 0 to 100.
*  <code>Csster.hslToHexColor(h,s,l)</code> converts a triplet to a hex color

Opacity is currently not supported by the color model.


## color_factory.js

Generate color schemes appropriate to prototypes, visualizations and maps.


### Random colors (useful for prototypes)

* <code>ColorFactory.random()</code> a random color, somewhat evenly distributed.
* <code>ColorFactory.randomGray()</code> a random gray scale value.
* <code>ColorFactory.randomHue()</code> given a saturation and lightness returns a random color.

<div style="border: 1px solid black; background-color: red; height: 15px; width: 15px;"></div>

### Interpolation

*  <code>ColorFactory.interpolate(color1, colorN, steps)</code>


### Color Schemes

Color scheme generation inspired by http://www.personal.psu.edu/cab38/ColorSch/Schemes.html


* <code>ColorFactory.qualitative([refColor], count)</code> Qualitative schemes do not imply magnitude differences between legend classes, and hues are used to create the primary visual differences between classes. Qualitative schemes are best suited to representing nominal or categorical data.
* <code>ColorFactory.sequential(startColor, [endColor], count)</code> Sequential schemes are suited to ordered data that progress from low to high. Lightness steps dominate the look of these schemes, with light colors for low data values to dark colors for high data values.
* <code>ColorFactory.binary(trueColor)</code> returns object with true => darker color, false=>lighter color.
* <code>ColorFactory.diverging()</code> Diverging schemes put equal emphasis on mid-range critical values and extremes at both ends of the data range. The critical class or break in the middle of the legend is emphasized with light colors and low and high extremes are emphasized with dark colors that have contrasting hues.


## funks.js

"Functional" helpers that contemplate different programming paradigms.



## jquery.columnize.js

Column level event triggering on a table. Handlers receive jQuery
objects with all the cells of a single table row, so that hover and click behavior
can be implemented on tables.
<pre>
         $('table').columnize().bind('columnmouseenter',function(e, $cells) {
             $cells.addClass('hover');
         }).bind('columnmouseleave',function(e, $cells) {
             $cells.removeClass('hover');
         });
</pre>
This is a primitive version of various other plugins,
but generally all that is needed for most jobs.