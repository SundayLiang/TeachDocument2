/**
 * Created by j on 2015/5/17.
 */
$(document).ready(function () {
    var taskId = getvl("taskId");
    var evarole=getvl("evarole");
    $('.close, #cancel').bind('click', closepop);

    firstPage();



    $("#backtolist").click(function(){
        parent.$("#mainFrame").attr("src", "evaluate/seeAll.html");
    })
    /**
     * 跳转到第一页
     */
    function firstPage() {

        row = 0; //初始化查询数据起始位置
        $("#allDataTable").empty(); // 清空当前内容

        $.ajax({
            url: "/TeachDocument2/evaluateItem/searchAllRemark",
            type: "post",
            dataType: "json",
            data: {

                "start": row,
                "taskId": taskId,
                "evaRole": evarole
            },
            success: function (json) {
                if(evarole=='stu'){
                refreshAllStuData(json, 1); // topage初始化为1
                }
                if(evarole=="supervisor"){
                    refreshAllSuperData(json,1);
                }
                if(evarole=="leader"){
                    refreshAllLeaderData(json,1);
                }
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
            url: "/TeachDocument2/evaluateItem/searchAllRemark",
            type: "post",
            dataType: "json",
            data: {
                "start": row,
                "taskId": taskId,
                "evaRole": evarole
            },
            success: function (json) {
                if(evarole=='stu'){
                    refreshAllStuData(json, 1); // topage初始化为1
                }
                if(evarole=="supervisor"){
                    refreshAllSuperData(json,1);
                }
                if(evarole=="leader"){
                    refreshAllLeaderData(json,1);
                }
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
            url: "/TeachDocument2/evaluateItem/searchAllRemark",
            type: "post",
            dataType: "json",
            data: {
                "start": row,
                "taskId": taskId,
                "evaRole": evarole
            },
            success: function (json) {
                if(evarole=='stu'){
                    refreshAllStuData(json, 1); // topage初始化为1
                }
                if(evarole=="supervisor"){
                    refreshAllSuperData(json,1);
                }
                if(evarole=="leader"){
                    refreshAllLeaderData(json,1);
                }
            }
        });
    });

    $("#allLastPage").click(function () {

    });

    /**
     * 更新数据内容
     */
    function refreshAllStuData(json, toPage) {
        var temp = ""; // 用来写入HTML语段

        var datalist = json.resultList; // 获取后台数据
        if(datalist.length==0){

            temp+="<div style='margin-left: 300px'>还没有该类评价哦！请查看其他！</div>"
        }

        for (var i = 0; i < datalist.length; i++) {

            /*
             * 循环显示所有后台数据条目
             */
            var isSameNum=datalist[i].columns.is_same;
            var isStrictNum=datalist[i].columns.is_strict;
            var isLawfulNum=datalist[i].columns.is_lawful;
            var isFocusNum=datalist[i].columns.is_focus;
            var isPowerfulNum=datalist[i].columns.is_powerful;
            temp += '<div class="card" style="height: 400px;width:1000px"> ' +
            '<p class="card_text">学生信息员评价表</p> ' +
            '<div style="height:0px; width:900px; border-bottom:1px dashed #999;' +
            'margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div> ' +
            '<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0" >';
            temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">教学内容是否与备案的教材、参考资料及教学日历一致</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50"><input name="isSame" type="radio"  '+ (isSameNum == 2 ? 'checked':'disabled="disabled"') +' value="2"/>是<input name="isSame" type="radio" '+ (isSameNum == 0 ? 'checked':'disabled="disabled"') +' value="0"/>否</td> </tr> ' +
            '<input type="hidden"id="taskId" name="taskId" value="';

            temp += datalist[0].columns.id;
            temp += '"/> <input type="hidden" name="fromWhom" value="';
            temp += 1;//放当前用户
            temp +='"/>';
            temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">严格遵守上、下课时间，不迟到、不提前下课</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50"><input name="isStrict" type="radio" '+ (isStrictNum == "2" ? 'checked':'disabled="disabled"') +' value="2"/>是<input name="isStrict" type="radio"'+ (isStrictNum == "0" ? 'checked':'disabled="disabled"') +' value="0"/>否</td> </tr> ';
            temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">停课、补课、调串课均按照学院文件要求正常办理手续，由学院通知学生</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50"><input name="isLawful" type="radio"'+ (isLawfulNum == "2" ? 'checked':'disabled="disabled"') +' value="2"/>是<input name="isLawful" type="radio"'+ (isLawfulNum == "0" ? 'checked':'disabled="disabled"') +' value="0"/>否</td> </tr> ';
            temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">授课过程中没有接听电话或者接待来访人员</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50"><input name="isFocus" type="radio"'+ (isFocusNum == "2" ? 'checked':'disabled="disabled"') +' value="2"/>是<input name="isFocus" type="radio"'+ (isFocusNum == "0" ? 'checked':'disabled="disabled"') +' value="0"/>否</td> </tr> ';
            temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">授课教师能够维护正常的理论教学秩序，及时制止违反课堂纪律的学生，确保学生听课质量</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50"><input name="isPowerful" type="radio"'+ (isPowerfulNum == "2" ? 'checked':'disabled="disabled"') +' value="2"/>是<input name="isPowerful" type="radio"'+ (isPowerfulNum == "0" ? 'checked':'disabled="disabled"') +' value="0"/>否</td> </tr> '

            temp +='<tr align="right"> <td colspan="3"><input class="subbutton" type="button" onclick="dele('+datalist[i].columns.id+',\'stu\')" value="删除"/>  </td> </tr>';
           temp += '</table></div>';

        }

        $("#main").prepend(temp);
        $("#allCountPage").text(json.pageCount);
        $("#allCurrentPage").text(toPage);
        $("#allPageTable").show();

    }
    function refreshAllLeaderData(json, toPage) {
        var temp = ""; // 用来写入HTML语段

        var datalist = json.resultList; // 获取后台数据
        if(datalist.length==0){
            temp+="<div style='margin-left: 300px'>还没有该类评价哦！请查看其他！</div>"
        }

        for (var i = 0; i < datalist.length; i++) {
            var finalResult=datalist[i].columns.result;
            temp += '<div class="card" style="height: 400px;width:1000px"> ' +
            '<p class="card_text">领导评价表</p> ' +
            '<div style="height:0px; width:900px; border-bottom:1px dashed #999;' +
            'margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div> ' +
            '<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0" >';
            temp += '<tr> <td align="center" width="300" height="40"><font size="3">评价内容：</font></td> <td colspan="2" align="center" width="700" height="80"><a href="../evaluateTables/DownloadLeader?id='+datalist[i].columns.id+'" target="_self"><img onclick="" class="evaimg" src="../img/pdfpic.png" title="点击下载！"></a></td> </tr> ' +
            '<tr> <td align="center" width="300" height="40"><font size="3">最终等级：</font></td> <td colspan="2" align="center" width="700" height="80">' +
            ' <input type="radio" name="score" '+ (finalResult == "95" ? 'checked':'disabled="disable"') +' value="95">优秀（90-100）<input type="radio" name="score" '+ (finalResult == "85" ? 'checked':'disabled="disable"') +'  value="85">良好（80-90）<input type="radio" name="score" '+ (finalResult == "75" ? 'checked':'disabled="disable"') +' value="75">一般（70-80）<br/> <input type="radio" name="score" '+ (finalResult == "65" ? 'checked':'disabled="disable"') +' value="65">及格（60-70）<input type="radio" name="score" '+ (finalResult == "55" ? 'checked':'disabled="disable"') +' value="55">不及格（60以下）</td> </tr>';


            temp +='<tr align="right"> <td colspan="3"><input class="subbutton" type="button" onclick="dele('+datalist[i].columns.id+',\'leader\')" value="删除"/>  </td> </tr>';
            temp += ' </table></div>';

        }

        $("#main").prepend(temp);
        $("#allCountPage").text(json.pageCount);
        $("#allCurrentPage").text(toPage);
        $("#allPageTable").show();

    }
    function refreshAllSuperData(json, toPage) {
        var temp = ""; // 用来写入HTML语段

        var datalist = json.resultList; // 获取后台数据
        if(datalist.length==0){
            temp+="<div style='margin-left: 300px'>还没有该类评价哦！请查看其他！</div>"
        }

        for (var i = 0; i < datalist.length; i++) {
            var finalResult=datalist[i].columns.result;
            temp += '<div class="card" style="height: 350px;width:1000px"> ' +
            '<p class="card_text">督导员评价表</p> ' +
            '<div style="height:0px; width:900px; border-bottom:1px dashed #999;' +
            'margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div> ' +
            '<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0" >';
            temp += '<tr> <td align="center" width="300" height="40"><font size="3">评价内容：</font></td> <td colspan="2" align="center" width="700" height="80"><a href="../evaluateTables/DownloadSuper?id='+datalist[i].columns.id+'" target="_self"><img onclick="" class="evaimg" src="../img/pdfpic.png" title="点击下载！"></a></td> </tr> ' +
            '<tr> <td align="center" width="300" height="40"><font size="3">最终等级：</font></td> <td colspan="2" align="center" width="700" height="80">' +
            ' <input type="radio" name="score" '+ (finalResult == "95" ? 'checked':'disabled="disable"') +' value="95">优秀（90-100）<input type="radio" name="score" '+ (finalResult == "85" ? 'checked':'disabled="disable"') +'  value="85">良好（80-90）<input type="radio" name="score" '+ (finalResult == "75" ? 'checked':'disabled="disable"') +' value="75">一般（70-80）<br/> <input type="radio" name="score" '+ (finalResult == "65" ? 'checked':'disabled="disable"') +' value="65">及格（60-70）<input type="radio" name="score" '+ (finalResult == "55" ? 'checked':'disabled="disable"') +' value="55">不及格（60以下）</td> </tr>';


            temp +='<tr align="right"> <td colspan="3"><input class="subbutton" type="button" onclick="dele('+datalist[i].columns.id+',\'supervisor\')" value="删除"/>  </td> </tr>';
            temp += ' </table></div>';

        }

        $("#main").prepend(temp);
        $("#allCountPage").text(json.pageCount);
        $("#allCurrentPage").text(toPage);
        $("#allPageTable").show();

    }

});




function closepop() {
    $('.popup_block').fadeOut(function () {
        $('.close').remove();
    });
}


function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};

function dele(id, wrole){
    if(window.confirm("确定要删除该评价？")){
        $.ajax(
            {
                url: "/TeachDocument2/evaluateTables/dele",
                type: "post",
                dataType: "json",
                data: {
                    "id": id,
                    "wrole": wrole
                },
                success: function (json) {

                }
            }
        )
        alert("删除成功");
        parent.$("#mainFrame").attr("src", "evaluate/seeAll.html");
    }
}




