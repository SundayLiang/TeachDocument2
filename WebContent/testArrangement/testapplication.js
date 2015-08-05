$(document).ready(function(){
	loadCourse();
	$('#coursename').change(function(){
		getDatas();
	});
});

function loadCourse(){
	$.ajax({
		url : "/TeachDocument2/Course/searchAll",
		type : "post",
		dataType : "json",
		success : function(json) {
			if(json!=null){
				var list=json;
				var html='<option value="">- 选择 -</option>';
				for(var i=0;i<list.length;i++){
					html+="<option value='"+list[i].id+"'>"+list[i].name+"</option>";
				}
				$("#coursename").empty();
				$("#coursename").append(html);				
			}
			else
				alert("加载失败");
		}
	});
}

function getDatas(){
	$.ajax({
		url : "/TeachDocument2/CourseTest/searchTest",
		type : "post",
		dataType : "json",
		data : {
			"course_id" : $("#coursename").val(),
			"term" : "2011-2012-1"
		},
		success : function(json) {
			if(json!=null){
				$("#teachername").val(json.rowList[0].teachername);
				$("#plantime").val(json.rowList[0].plantime);
				$("#classtime").val(json.rowList[0].classtime);				
			}
			else
				alert("加载失败");
		}
	});
}

function SubmitEvaluate(){
	$.ajax({
		url : "/TeachDocument2/CourseTest/insert",
		type : "post",
		dataType : "json",
		data : {
			"course_id" : $("#coursename").val(),
			"term" : "2011-2012-1",
			"teachername" : $("#teachername").val(),
			"plantime" : $("#plantime").val(),
			"classtime" : $("#classtime").val(),				
			"usetime": $("#usetime").val(),
			"teststyle":$("#teststyle").val(),
			"scale":$("#scale").val(),
			
			//start by lfl-------添加班级和人数
			"amountstu":$("#amountstu").val()			
			
			//end by lfl
		},
		success : function(json) {
			if(json){
				alert($("#teststyle").val());
				alert("成功");
			}
			else
				alert("失败");
		}
	});
}

