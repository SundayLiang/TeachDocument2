/**
 * Created by j on 2015/5/16.
 */
$(document).ready(function () {
    $('.close, #cancel').bind('click', closepop);
    /*
     * tab之间的互相切换
     */
    $("#content").find("[id^='tab']").hide();
    $("#content #tab1").show();
    // Show first tab's content

    $('#tabs a').click(function (e) {
        e.preventDefault();

        if ($(this).closest("a").attr("name") == "tab1") {
            $("#content #tab1").show();
            $("#content #tab2").hide();
            $("#content #tab3").hide();
            firstPage();
        }
        else if ($(this).closest("a").attr("name") == "tab2") {
            $("#content #tab2").show();
            $("#content #tab1").hide();
            $("#content #tab3").hide();
        }
        else if ($(this).closest("a").attr("name") == "tab3") {
            $("#content #tab3").show();
            $("#content #tab1").hide();
            $("#content #tab2").hide();
        }
    });


    getselect1();
    if(hasPermission(1)){
        $("#termchoose").after('筛选老师：<select id="teacherchoose"  onchange="newclass()"></select>');
        getselect2();
    }

    getselect3();
    firstPage();


});

function newclass(){
    firstPage();
}
/**
 * 跳转到第一页
 */
function firstPage() {
    var term="all";
    var teacher="all";
    var course="all";
    if($("#termchoose").val()!=null&&$("#termchoose").val()!=0){
        term=$("#termchoose").val();
    }
    if($("#teacherchoose").val()!=null&&$("#teacherchoose").val()!=0){
        teacher=$("#teacherchoose").val()
    }
    if($("#coursechoose").val()!=null&&$("#coursechoose").val()!=0){
        course=$("#coursechoose").val();
    }
    row = 0; //初始化查询数据起始位置
    $("#allDataTable").empty(); // 清空当前内容

    $.ajax({
        url: "/TeachDocument2/evaluateItem/search",
        type: "post",
        dataType: "json",
        data: {
            "term":term,
            "teacherId":teacher,
            "courseId":course,
            "start": row,
            "length": "20",
            "whatRole": "stu"
        },
        success: function (json) {
            refreshAllData(json, 1); // topage初始化为1
        }
    });
}

/**
 * 跳转到第一页
 */
$("#allFirstPage").click(function () {
    if (Number($("#allCurrentPage").text()) == 1) {
        return; // 当前已经是第一页，不做相应
    }
    firstPage(); // 生成第一页内容
});

/**
 * 跳转到下一页
 */
$("#allNextPage").click(function () {
    var term="all";
    var teacher="all";
    var course="all";
    if($("#termchoose").val()!=null&&$("#termchoose").val()!=0){
        term=$("#termchoose").val();
    }
    if($("#teacherchoose").val()!=null&&$("#teacherchoose").val()!=0){
        teacher=$("#teacherchoose").val()
    }
    if($("#coursechoose").val()!=null&&$("#coursechoose").val()!=0){
        course=$("#coursechoose").val();
    }
    var toPage = Number($("#allCurrentPage").text()) + 1; //现有页码基础上加1，生成新的页码
    row = (toPage-1)*20;
    /*
     * 记录每页的起始数据位置到pagelist中
     */

    //当前已经是最后一页，不做响应
    if (toPage - 1 == Number($("#allCountPage").text())) {
        return;
    }

    $("#allDataTable").empty(); // 清空当前内容
    $.ajax({
        url: "/TeachDocument2/evaluateItem/search",
        type: "post",
        dataType: "json",
        data: {
            "term":term,
            "teacherId":teacher,
            "courseId":course,
            "start": row,
            "length": 20,
            "whatRole": "stu"
        },
        success: function (json) {
            refreshAllData(json, toPage);
        }
    });

});



/**
 * 跳转到上一页
 */
$("#allPrevPage").click(function () {
    var term="all";
    var teacher="all";
    var course="all";
    if($("#termchoose").val()!=null&&$("#termchoose").val()!=0){
        term=$("#termchoose").val();
    }
    if($("#teacherchoose").val()!=null&&$("#teacherchoose").val()!=0){
        teacher=$("#teacherchoose").val()
    }
    if($("#coursechoose").val()!=null&&$("#coursechoose").val()!=0){
        course=$("#coursechoose").val();
    }
    var toPage = Number($("#allCurrentPage").text()) - 1;

    if (toPage < 1) {
        return; // 说明当前已经是第一页，不做相应
    }
    $("#allDataTable").empty(); // 清空现有内容

    row = (toPage-1)*20 // 找到上一页的起始位置

    $.ajax({
        url: "/TeachDocument2/evaluateItem/search",
        type: "post",
        dataType: "json",
        data: {
            "term":term,
            "teacherId":teacher,
            "courseId":course,
            "start": row,
            "length": 20,
            "whatRole": "stu"
        },
        success: function (json) {
            refreshAllData(json, toPage);
        }
    });
});

$("#allLastPage").click(function () {

});

function newclass(){
    firstPage();
}

/**
 * 更新数据内容
 */
function refreshAllData(json, toPage) {
    var temp = ""; // 用来写入HTML语段

    var rowList = json.resultList; // 获取后台数据

    for (var i = 0; i < rowList.length; i++) {
        /*
         * 循环显示所有后台数据条目
         */
        temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
        temp += "<td width='220' height='40' value='";
        temp += rowList[i].columns.id + "'>";
        temp += rowList[i].columns.id;
        temp += "</td><td width='220' value='";
        temp += rowList[i].columns.course_name + "'>";
        temp += rowList[i].columns.course_name;
        temp += "</td><td width='220' value='";

        temp += rowList[i].columns.teacher_id + "'>";
        temp += rowList[i].columns.teacher_name;
        temp += "</td>";
        temp += "<td width='350'>";
        temp += rowList[i].columns.target_classes;
        temp += "</td>";
        temp += "<td width='120' style='background-color: #119000'>"
        temp += "<input type='button' value='信息员评价' onclick=\"showDetail(" + rowList[i].columns.id +
        ",\'stu\')\" /></td>";

        temp += "<td width='120' style='background-color: #FFB70A'>"
        temp += "<input type='button' value='领导评价' onclick=\"showDetail(" + rowList[i].columns.id + ",\'leader\')\" /></td>";

        temp += "<td width='120' style='background-color: #1179AE'>";
        temp += "<input type='button' value='督导员评价' onclick=\"showDetail(" + rowList[i].columns.id + ", \'supervisor\')\" /></td>";
        temp += "<td width='120'>"+(rowList[i].columns.score!=null?rowList[i].columns.score:'尚未得出')+"</td>";
        temp += "</tr>";

        row++;

    }

    $("#allDataTable").append(temp);
    $("#allCountPage").text(json.pageCount);
    $("#allCurrentPage").text(toPage);
    $("#allPageTable").show();

}

function showDetail(taskID, wrole) {
    parent.$("#mainFrame").attr("src", "evaluate/allEvaDetail.html?taskID=" + taskID+"&evarole="+wrole+"" );
}


function closepop() {
    $('.popup_block').fadeOut(function () {
        $('.close').remove();
    });
}

function getselect1() {
    $.ajax({
        url: "/TeachDocument2/evaluateItem/searchTermLine",
        type: "post",
        dataType: "json",

        success: function (json) {
            putterm(json);
        }
    });
}
function getselect2(){
    $.ajax({
        url: "/TeachDocument2/evaluateItem/searchTeacherLine",
        type: "post",
        dataType: "json",

        success: function (json) {
            putteacher(json);
        }
    });
}
function getselect3(){
    $.ajax({
        url: "/TeachDocument2/evaluateItem/searchCourseLine",
        type: "post",
        dataType: "json",

        success: function (json) {
            putcourse(json);
        }
    });
}
function putterm(json){
    var temp="<option value='0' selected>显示全部</option>";
    var rowList = json.termlist;
    for (var i = 0; i < rowList.length; i++) {
        temp += "<option value='"+rowList[i].columns.TERM+"'>"+rowList[i].columns.TERM+"</option>"
    }
    $("#termchoose").append(temp);
}
function putteacher(json){
    var temp="<option value='0' selected>显示全部</option>";
    var rowList = json.teacherlist;
    for (var i = 0; i < rowList.length; i++) {
        temp += "<option value='"+rowList[i].columns.id+"'>"+rowList[i].columns.name+"</option>"
    }
    $("#teacherchoose").append(temp);
}
function putcourse(json){
    var temp="<option value='0' selected>显示全部</option>";
    var rowList = json.courselist;
    for (var i = 0; i < rowList.length; i++) {
        temp += "<option value='"+rowList[i].columns.id+"'>"+rowList[i].columns.name+"</option>"
    }
    $("#coursechoose").append(temp);
}
function hasPermission(permission){
    var bool=false;
    if(""!=permission){
        $.ajax({
            url : "/TeachDocument2/RolePermission/hasPermission",
            type : "post",
            async: false,
            dataType : "text",
            data : {
                "permission" : permission
            },
            success : function(json) {
                if(json=="true"){
                    bool=true;
                }
            }
        });
    }
    return bool;
}



