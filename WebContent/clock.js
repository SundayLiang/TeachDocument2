$(document).ready(function () {
    var now = new Date();
    var temp = formatTime(now);
    $("#timeNow").text(temp);

    setInterval("freshTime()", 60000);
});
function freshTime() {
    var now = new Date();
    var temp = formatTime(now);
    $("#timeNow").text(temp);
}

function formatTime(date) {
    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var h = date.getHours();
    //判断上下午
    if (12 - h >= 0) {
        $("#t1").text("AM");
    } else {
        $("#t1").text("PM");
    }
    //开头补位
    h = h > 12 ? h - 12 : h;
    if (h < 10) {
        h = "0" + h;
    }
    //开头补位
    var m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }

    $("#t2").text(date.getDate());
    $("#t3").text(week[date.getDay()]);
    $("#t4").text(month[date.getMonth()]);
    return h + ":" + m;

}
