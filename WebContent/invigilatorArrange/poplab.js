num="";
$(document).ready(function(){
	id=getParamFromUrl(document.location.href,"id");
	num=getParamFromUrl(document.location.href,"num");
//	loadPerson();
	refreshAllData();
	$('#button').click(function(){
		SubmitEvaluate(id);
	});
});


function SubmitEvaluate(id){
	$.ajax({
		url : "/TeachDocument2/invigilator/insertInvigilatorLab",
		type : "post",
		dataType : "json",
		data : {
//			"id":id,
//			"person_name": personname()
			"test_id":id,
			"numbers":numOfTeaOfLab()
		},
		success : function(json) {
			if(json){
				alert("成功");
				window.parent.closeQuery();
			}
			else
				alert("失败");
			    window.parent.closeQuery();
		}
	});
}

function loadPerson(){
	$.ajax({
		url : "/TeachDocument2/user",
		type : "post",
		dataType : "json",
		data : {
			"start" : 0,
			"length" : 20,
		},
		success : function(json) {
			refreshAllData(json); 
		}
	});
}

function refreshAllData(){
	var temp = "";
	/*for(var i=0;i<num;i++){
		temp+='<tr>';
		temp+='<td height="26px">监考人员</td>';
		temp+='<td width="12px"></td>';
		temp+='<td height="34px"><input name="testperson" id="testperson'+(i+1)+'" width="300" value="" style="outline:none;"></td>';
		temp+='</tr>';
	}*/
	temp+='<tr><td>数字媒体技术</td><td><input id="numOf1" type="text" name="numOf1" value=0 style="ime-mode:disabled"  onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false">人</td></tr>';
	temp+='<tr><td>软件工程研究所</td><td><input id="numOf2" type="text" name="numOf2" value=0 style="ime-mode:disabled"  onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false">人</td></tr>';
	temp+='<tr><td>信息安全研究所</td><td><input id="numOf3" type="text" name="numOf3" value=0 style="ime-mode:disabled"  onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false">人</td></tr>';
	temp+='<tr><td>外语教学部</td><td><input id="numOf4" type="text" name="numOf4" value=0 style="ime-mode:disabled"  onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false">人</td></tr>';
	temp+='<tr><td>外聘教师</td><td><input id="numOf5" type="text" name="numOf5" value=0 style="ime-mode:disabled"  onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false">人</td></tr>';
	$("#persontable").append(temp);
}

function personname(){
	var personnames="";
	for(var i=0;i<num;i++){
		personnames+=$("#testperson"+(i+1)).val()+"、";
	}
	return personnames;
}

function numOfTeaOfLab(){
	var nums="";
	for(var i=0;i<5;i++){
		nums+=$("#numOf"+(i+1)).val()+"、";
	}
	alert(nums);
	return nums;
}

function getParamFromUrl(str_url,param_name) {
    var i = str_url.indexOf("?");
    var start = str_url.indexOf(param_name + "=", i);
    if (!(start > 0))
        return "";
    start = start + param_name.length + 1;
    var end = str_url.indexOf("&", start);
    end = end > 0 ? end : str_url.length;
    return str_url.substring(start,end);
}