/**
 * Created by j on 2015/5/19.
 */
$(document).ready(function () {
    $('.close, #cancel').bind('click', closepop);
    /*
     * tab之间的互相切换
     */
    // Show first tab's content
    $("#content").find("[id^='tab']").hide();
    $("#content #tab1").show();
    // Show first tab's content

    $('#tabs a').click(function (e) {
        e.preventDefault();

        if ($(this).closest("a").attr("name") == "tab1") {
            $("#content #tab1").show();
            $("#content #tab2").hide();
            firstPage();
        }
        else if ($(this).closest("a").attr("name") == "tab2") {
            $("#content #tab2").show();
            $("#content #tab1").hide();
        }

    });


 firstPage();



});


/**
 * 跳转到第一页
 */
function firstPage() {
    row = 0; //初始化查询数据起始位置
    $("#allDataTable").empty(); // 清空当前内容

    $.ajax({
        url: "/TeachDocument2/User/search",
        type: "post",
        dataType: "json",
        data: {
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
        url: "/TeachDocument2/User/search",
        type: "post",
        dataType: "json",
        data: {

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

    var toPage = Number($("#allCurrentPage").text()) - 1;

    if (toPage < 1) {
        return; // 说明当前已经是第一页，不做相应
    }
    $("#allDataTable").empty(); // 清空现有内容

    row = (toPage-1)*20 // 找到上一页的起始位置

    $.ajax({
        url: "/TeachDocument2/User/search",
        type: "post",
        dataType: "json",
        data: {

        },
        success: function (json) {
            refreshAllData(json, toPage);
        }
    });
});

$("#allLastPage").click(function () {

});
function deleteuser(id){
    if(window.confirm("要删除用户，请慎重！是否删除？")) {
        $.ajax({
            url: "/TeachDocument2/User/delete",
            type: "post",
            dataType: "text",
            data: {
                "id": id
            },
            success: function (text) {
                if(text=="yes"){
                    alert("删除成功");
                    newclass();
                }
                if(text=="no"){
                    alert("删除时出错！");
                }
            }
        })
    }
}
function newclass(){
    firstPage();
}

/**
 * ---------------------------------------------------------------------------更新数据内容---------------------------------------------------------------------
 */
function refreshAllData(json, toPage) {

    var rowList = json.resultList; // 获取后台数据
    var temp = ""; // 用来写入HTML语段

    for (var i = 0; i < rowList.length; i++) {
        /*
         * 循环显示所有后台数据条目
         */

        temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
        temp += "<td width='220' height='40'>";
        temp += rowList[i].columns.id;
        temp += "</td><td width='220' >";
        temp += rowList[i].columns.name;
        temp += "</td><td width='320''>";
        temp += rowList[i].columns.rname;
        temp += "</td><td width='200'>";
        temp += "<input type='button' value='重置密码为000' onclick='resetpass(" + rowList[i].columns.id + ")' />";
        temp += "</td><td width='280'>";
        temp += "<input type='button' value='删除用户' onclick='deleteuser(" + rowList[i].columns.id + ")' />";
        temp += "</td><td width='180'>";
        temp += "<input type='button' value='权限管理' onclick='ShowModal(" + rowList[i].columns.id + ")' />";
        temp += "</td>";

        temp += "</tr>";
    }
    $("#allDataTable").append(temp);
    $("#allCountPage").text(json.pageCount);
    $("#allCurrentPage").text(toPage);
    $("#allPageTable").show();

}
function showDetail(id){
    alert(id);
}

function closepop() {
    $('.popup_block').fadeOut(function () {
        $('.close').remove();
    });
}

function roleperm(id){}


function resetpass(id){
    if(window.confirm("确定要将该用户密码重置为000？")){
        $.ajax({
            url:"/TeachDocument2/User/update",
            type: "post",
            dataType: "text",
            data: {
                "id":id
            },
            success: function (text){
                if(text=="yes"){
                    alert("重置成功");
                }
                if(text=="no"){
                    alert("重置时出错！");
                }
            }
        })
    }
}