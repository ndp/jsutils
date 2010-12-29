/*  $('table tbody tr td, table thead.icons tr th').hover(function() {
 $(this).children().addClass('hovered');
 var columnIndex = $(this).parent().children().index($(this));
 var $table = $(this).parents('table:first');
 $table.find('tr').find(':nth-child(' + (columnIndex + 1) + ')').toggleClass('hovered').find('.matrix_headings').toggleClass('hovered');
 $(this).closest('tr').find('span').addClass('hovered');
 }, function() {
 var $table = $(this).parents('table:first');
 $('.hovered', $table).removeClass('hovered');
 });
 */

// $('table').columnEvents().bind('column.mouseover', f
$.fn.columnize = function() {
    return $(this).each(function() {
        var $table = $(this);
        $('td,th', this).bind('mouseenter mouseleave click', function(e) {
            var columnIndex = $(this).parent().children().index($(this));
            var $cells = $table.find('tr').find(':nth-child(' + (columnIndex + 1) + ')');
            return $table.trigger('column' + e.type, [$cells]);
        });
    });
}
