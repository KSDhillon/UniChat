var autoHeight = function(inputClass) {
    $(inputClass).height($(window).height() - $('.navbar').outerHeight() - 2);
}

var fillSpace = function() {
    $('.chat-box').height($('#chat-panel').outerHeight() - $('.tray-banner').outerHeight() - 1);
}

$( document ).ready(function() {
    autoHeight('.auto_height_item');
    fillSpace();
});

$( window ).resize(function() {
    autoHeight('.auto_height_item');
    fillSpace();
});
