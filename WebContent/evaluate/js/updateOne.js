/**
 * Created by j on 2015/4/22.
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
                whatRole: "stu"
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
    var isSameNum=datalist[0].columns.is_same;
    var isStrictNum=datalist[0].columns.is_strict;
    var isLawfulNum=datalist[0].columns.is_lawful;
    var isFocusNum=datalist[0].columns.is_focus;
    var isPowerfulNum=datalist[0].columns.is_powerful;
    temp +='<tr> <td align="left" style="padding-left: 50px"   width="290px" height="52px">课程名称：';
    temp += datalist[0].columns.course_name + '<input type="hidden"id="task_Id"  name="task_Id" value="'+datalist[0].columns.remark_id+'"/></td>';
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
    temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">教学内容是否与备案的教材、参考资料及教学日历一致</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50"><input name="isSame" type="radio"  '+ (isSameNum == 2 ? 'checked':'') +' value="2"/>是<input name="isSame" type="radio" '+ (isSameNum == 0 ? 'checked':'') +' value="0"/>否</td> </tr> ' +
    '<input type="hidden"id="taskId" name="taskId" value="';

    temp += datalist[0].columns.id;
    temp += '"/> <input type="hidden" name="fromWhom" value="';
    temp += 1;//放当前用户
    temp +='"/>';
    temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">严格遵守上、下课时间，不迟到、不提前下课</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50"><input name="isStrict" type="radio" '+ (isStrictNum == "2" ? 'checked':'') +' value="2"/>是<input name="isStrict" type="radio"'+ (isStrictNum == "0" ? 'checked':'') +' value="0"/>否</td> </tr> ';
    temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">停课、补课、调串课均按照学院文件要求正常办理手续，由学院通知学生</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50"><input name="isLawful" type="radio"'+ (isLawfulNum == "2" ? 'checked':'') +' value="2"/>是<input name="isLawful" type="radio"'+ (isLawfulNum == "0" ? 'checked':'') +' value="0"/>否</td> </tr> ';
    temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">授课过程中没有接听电话或者接待来访人员</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50"><input name="isFocus" type="radio"'+ (isFocusNum == "2" ? 'checked':'') +' value="2"/>是<input name="isFocus" type="radio"'+ (isFocusNum == "0" ? 'checked':'') +' value="0"/>否</td> </tr> ';
    temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">授课教师能够维护正常的理论教学秩序，及时制止违反课堂纪律的学生，确保学生听课质量</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50"><input name="isPowerful" type="radio"'+ (isPowerfulNum == "2" ? 'checked':'') +' value="2"/>是<input name="isPowerful" type="radio"'+ (isPowerfulNum == "0" ? 'checked':'') +' value="0"/>否</td> </tr> '

    temp +='<tr><td colspan="3"><input class="subbutton" type="button" onclick="evasub()" value="提交"/> <input class="subbutton" type="button" onclick="cel()" value="取消"/> </td> </tr>';

    $("#evaluateTable").empty();
    $("#evaluateTable").append(temp);
}
function evasub(){
    var isSame = document.getElementsByName("isSame");
    var isStrict=document.getElementsByName("isStrict");
    var isLawful = document.getElementsByName("isLawful");
    var isFocus = document.getElementsByName("isFocus");
    var isPowerful = document.getElementsByName("isPowerful");
    var isSameNum;
    var isStrictNum;
    var isLawfulNum;
    var isFocusNum;
    var isPowerfulNum;
    for(var i=0;i<isSame.length;i++)
    {
        if(isSame[i].checked)
            isSameNum = isSame[i].value;
    }
    if(isSameNum==null){
        alert("第一项未评！");
    }
    for(var i=0;i<isStrict.length;i++)
    {
        if(isStrict[i].checked)
            isStrictNum = isStrict[i].value;
    }
    if(isStrictNum==null){
        alert("第二项未评！");
    }
    for(var i=0;i<isLawful.length;i++)
    {
        if(isLawful[i].checked)
            isLawfulNum = isLawful[i].value;
    }
    if(isLawfulNum==null){
        alert("第三项未评！");
    }
    for(var i=0;i<isFocus.length;i++)
    {
        if(isFocus[i].checked)
            isFocusNum = isFocus[i].value;
    }
    if(isFocusNum==null){
        alert("第四项未评！");
    }
    for(var i=0;i<isPowerful.length;i++)
    {
        if(isPowerful[i].checked)
            isPowerfulNum = isPowerful[i].value;
    }
    if(isPowerfulNum==null){
        alert("第五项未评！");
    }

    //if($("#content").value==null||$("#content").value==" "){
    //    alert("请填写评价内容！");
    //}

    else if(window.confirm("确定要修改您的评价吗")){
        var taskId = $("#task_Id").val();
        $.ajax({
            url: "/TeachDocument2/evaluateTables/updateStuEva",
            type: "post",
            dataType: "json",
            data: {
                "isSame":isSameNum,
                "isStrict":isStrictNum,
                "isLawful":isLawfulNum,
                "isFocus":isFocusNum,
                "isPowerful":isPowerfulNum,
                "taskId":taskId
            },
            success: function (flag) {
                if(flag){
                    alert("提交成功！");
                    parent.$("#mainFrame").attr("src", "evaluate/evaluat.html");
                }
            }
        })
    }
}
function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};

function cel(){
    if (window.confirm("确定要放弃当前所做的修改？")){
        parent.$("#mainFrame").attr("src", "evaluate/evaluat.html");
    }

}


