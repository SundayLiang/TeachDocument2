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
    temp += '<tr> <td align="center" width="100" height="40"><font size="3">评价内容（上传您的问卷文件）：</font></td> <td colspan="2" align="center" width="100" height="80"><input id="content" type="file" name="content"/></td> </tr> <tr> <td align="center" width="100" height="40"><font size="3">最终等级：</font></td> <td colspan="2" align="center" width="100" height="80"> <input type="radio" name="score" value="95">优秀（90-100）<input type="radio" name="score" value="85">良好（80-90）<input type="radio" name="score" value="75">一般（70-80）<br/> <input type="radio" name="score" value="65">及格（60-70）<input type="radio" name="score" value="55">不及格（60以下）</td> </tr> <tr align="right"> <td colspan="3"> <input type="hidden"id="taskId" name="taskId" value="';
    temp += datalist[0].columns.id;
    temp += '"/> <input type="hidden" name="fromWhom" value="';
    temp += 1;//放当前用户
    temp +='"/><input class="subbutton" type="submit" onclick="return evasub()" value="提交"/> <input class="subbutton" type="button" onclick="cel()" value="取消"/> </td> </tr>';

    $("#evaluateTable").empty();
    $("#evaluateTable").append(temp);
}
function evasub(){
    var temp = document.getElementsByName("score");
    var intHot;
    for(var i=0;i<temp.length;i++)
    {
        if(temp[i].checked)
            intHot = temp[i].value;
    }
    if(intHot==null){
        alert("输入评价等级");
    }

    if($("#content").val()==""){
        alert("请选择要上传的图片！");
        return false;
    }

    //if($("#content").value==null||$("#content").value==" "){
    //    alert("请填写评价内容！");
    //}

    else if(window.confirm("确定要提交您的评价吗")){
        return true;
        //var taskId = $("#taskId").val();
        //var content = $("#content").val();
        //var result = intHot;
        //var fromWhom = 1;
        //$.ajax({
        //    url: "/TeachDocument2/evaluateTables/insertSuperEva",
        //    type: "post",
        //    dataType: "json",
        //    data: {
        //        "taskId":taskId,
        //        "content":content,
        //        "result":result,
        //        "fromWhom":fromWhom
        //    },
        //    success: function (flag) {
        //        if(flag){
        //            alert("提交成功！");
        //            parent.$("#mainFrame").attr("src", "evaluate/supervisorEvaluate.html");
        //        }
        //    }
        //})
    }
    else {return false;}
}
//获得上一页面传值
function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};

function cel(){
    if (window.confirm("确定要放弃当前编辑内容？")){
        parent.$("#mainFrame").attr("src", "evaluate/supervisorEvaluate.html");
    }

}

