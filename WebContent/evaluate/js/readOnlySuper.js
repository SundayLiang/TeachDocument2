/**
 * Created by j on 2015/4/24.
 */
$(document).ready(function(){
    var taskId = getvl("taskId");
    hahaha();

    function hahaha(){
        $.ajax({
            url: "/TeachDocument2/evaluateItem/searchOne",
            type: "post",
            dataType: "json",
            data: {
                taskId: taskId,
                whatRole: "supervisor"
            },
            success: function (json) {
                loadElement(json);
            }
        })
    }



})

function loadElement(a){
    var datalist=a.resultlist;
    var temp = "";
    var finalResult=datalist[0].columns.resultn;
    temp +='<tr> <td align="left" style="padding-left: 50px"   width="290px" height="52px">课程名称：';
    temp += datalist[0].columns.course_name + '</td>';
    temp += '<td align="left" style="padding-left: 50px"  width="290px" height="52px">授课班级：';
    temp += datalist[0].columns.target_classes +'</td>';
    temp += '<td align="left"   style="padding-left: 50px" width="290px" height="52px">学生人数：';
    temp += datalist[0].columns.amount_stu+'</td> </tr>';
    temp += '<tr><td align="left" style="padding-left: 50px"   width="290px" height="52px">任课教师：';
    temp += datalist[0].columns.teacher_name+'</td>';
    temp += ' <td align="left" style="padding-left: 50px"   width="290px" height="52px">授课地点：';
    temp += datalist[0].columns.teach_place +'</td>';
    temp += '<td align="left" style="padding-left: 50px"   width="290px" height="52px">授课时间：';
    temp += datalist[0].columns.weeks+'</td></tr>';
    temp += '<tr> <td align="center" width="100" height="40"><font size="3">评价内容：</font></td> <td colspan="2" align="center" width="100" height="80"><a href="../evaluateTables/DownloadSuper?id='+datalist[0].columns.remark_id+'" target="_self"><img class="evaimg" src="../img/pdfpic.png" title="点击下载！"></a></td> </tr> ' +
    '<tr> <td align="center" width="100" height="40"><font size="3">最终等级：</font></td> <td colspan="2" align="center" width="100" height="80">' +
    ' <input type="radio" name="score" '+ (finalResult == "95" ? 'checked':'disabled="disable"') +' value="95">优秀（90-100）<input type="radio" name="score" '+ (finalResult == "85" ? 'checked':'disabled="disable"') +'  value="85">良好（80-90）<input type="radio" name="score" '+ (finalResult == "75" ? 'checked':'disabled="disable"') +' value="75">一般（70-80）<br/> <input type="radio" name="score" '+ (finalResult == "65" ? 'checked':'disabled="disable"') +' value="65">及格（60-70）<input type="radio" name="score" '+ (finalResult == "55" ? 'checked':'disabled="disable"') +' value="55">不及格（60以下）</td> </tr>' +
    ' <tr align="right"> <td colspan="3">';
    temp +='<input class="subbutton" type="button" onclick="cel()" value="返回列表"/>  </td> </tr>';

    $("#evaluateTable").empty();
    $("#evaluateTable").append(temp);
}

function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};

function cel(){

    parent.$("#mainFrame").attr("src", "evaluate/supervisorEvaluate.html");

}
