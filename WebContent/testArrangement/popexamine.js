$(document).ready(function(){
	course_id=getParamFromUrl(document.location.href,"course_id");
	term=getParamFromUrl(document.location.href,"trem");
	$('#button').click(function(){
		SubmitEvaluate(course_id,term);
	});
});


function SubmitEvaluate(course_id,term){
	$.ajax({
		url : "/TeachDocument2/CourseTest/updateTest",
		type : "post",
		dataType : "json",
		data : {
			"course_id":course_id,
			"term":term,
			"testplace": $("#testplace").val(),
			"testdate":$("#testdate").val(),
			"week":$("#week").val(),
			"weekday":$("#weekday").val(),
			"starttime":$("#starttime").val(),
			"endtime":$("#endtime").val()
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