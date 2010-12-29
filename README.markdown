# Javascript Utilities

Various utilities that don't (yet) warrant packaging on their own.


## Color Helpers

Utilities to perform color math and manipulation. Extracted from Csster.


## Color Factory

Generate color schemes appropriate to prototypes, visualizations and maps.


### Random colors (useful for prototypes)

* <code>ColorFactory.random()</code> a random color, somewhat evenly distributed.
* <code>ColorFactory.randomGray()</code> a random gray scale value.
* <code>ColorFactory.randomHue()</code> given a saturation and lightness returns a random color.

### Interpolation

*  <code>ColorFactory.interpolate(color1, colorN, steps)</code>


### Color Schemes

Color scheme generation inspired by http://www.personal.psu.edu/cab38/ColorSch/Schemes.html


* <code>ColorFactory.qualitative([refColor], count)</code> Qualitative schemes do not imply magnitude differences between legend classes, and hues are used to create the primary visual differences between classes. Qualitative schemes are best suited to representing nominal or categorical data.
* <code>ColorFactory.sequential(startColor, [endColor], count)</code> Sequential schemes are suited to ordered data that progress from low to high. Lightness steps dominate the look of these schemes, with light colors for low data values to dark colors for high data values.
* <code>ColorFactory.binary(trueColor)</code> returns object with true => darker color, false=>lighter color.
* <code>ColorFactory.diverging()</code> Diverging schemes put equal emphasis on mid-range critical values and extremes at both ends of the data range. The critical class or break in the middle of the legend is emphasized with light colors and low and high extremes are emphasized with dark colors that have contrasting hues.


## Funks

"Functional" helpers that contemplate different programming paradigms.



## Columnize (jQuery plugin)

Provides column level event triggering for a table's columns. Events receive jQuery
objects with all the cells of a single table row, so that hover and click behavior
can be implemented on tables. 