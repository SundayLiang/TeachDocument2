name="";
time="";
$(document).ready(function(){
	name=getParamFromUrl(document.location.href,"name");
	time=getParamFromUrl(document.location.href,"time");
	name=window.parent.frames['mainFrame'].$('#'+name).attr("value");
	$('#doc_name').val(name);
	$('#button').click(function(){
		SubmitUpdate();
	});
});


function SubmitUpdate(){
	$.ajax({
		url : "/TeachDocument2/TaskStandard/update",
		type : "post",
		dataType : "json",
		data : {
			"doc_name": name,
			"deadline":$("#deadline").val()
		},
		success : function(json) {
			if(json){
				alert("成功");
				window.parent.closeQuery();
			}
			else
				alert("失败");
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