$(document).ready(function () {

});
function closepop(page) {
    $('#popup_detail').fadeOut(function () {
        window.frames["mainFrame"].getPage(page);
        $('#popup_detail').html('');
        $('#fade').remove();
    });
}
function closeQueryToPage(page) {
    window.frames["mainFrame"].getPage(page);
    $('#popup_query').fadeOut(function () {
        $('#popup_query').html('');
        $('#fade').remove();
    });
}

function closeQuery() {
    $('#popup_query').fadeOut(function () {
        $('#popup_query').html('');
        $('#fade').remove();
    });
}

function closeDevide() {
    $('#popup_name').fadeOut(function () {
        $('#popup_name').html('');
        $('#fade').remove();
    });
}




