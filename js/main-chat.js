var x, y, EndX, EndY;
$(document).mousedown(function (e) {
    x = e.pageX;
    y = e.pageY;
});
$(document).mouseup(function (e) {
    EndX = e.pageX;
    EndY = e.pageY;
    var mx = EndX - x;
    var my = EndY - y;
    window.external.FormMove(mx, my);
});
//$(".setting").click(function () {
//})

$(".min").click(function () {
    window.external.API_FormMinimized();
});
$(".close").click(function () {
    window.external.API_FormClosed();
});
