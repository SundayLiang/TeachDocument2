$(document).ready(function(){
	id=getParamFromUrl(document.location.href,"id");
	$('#button').click(function(){
		SubmitEvaluate(id);
	});
});


function SubmitEvaluate(id){
	$.ajax({
		url : "/TeachDocument2/TeachDocRecord/Evaluate",
		type : "post",
		dataType : "json",
		data : {
			"id": id,
			"score":$("#score").val()
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