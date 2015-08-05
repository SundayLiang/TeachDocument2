$(document).ready(function() {
	$('.close, #cancel').bind('click', closepop);	
	$("#content").find("[id^='tab']").hide();
	$("#content #tab1").show();	
	$('#tabs a').click(function(e) {
		e.preventDefault();
			
			if($(this).closest("a").attr("name")=="tab1"){
				$("#content #tab1").show();
				$("#content #tab2").hide();
				firstPage();
			}
			else if($(this).closest("a").attr("name")=="tab2"){
				$("#content #tab2").show();
				$("#content #tab1").hide();
			}
	});	
	firstPage();
	var row = 0; 
	var pageList = new Array();
	pageList.push(row);
	function firstPage() {
		row = 0; 
		$("#allDataTable").empty(); 
		$.ajax({
			url : "/TeachDocument2/TeachDoc/search",
			type : "post",
			dataType : "json",
			data : {
				"start" : row,
				"length" : 20,
			},
			success : function(json) {
				refreshAllData(json, 1); // 杈撳嚭鏁版嵁
			}
		});
	}

	$("#allFirstPage").click(function() {
		if (Number($("#allCurrentPage").text()) == 1) {
			return; // 濡傛灉褰撳墠鏄涓�椤靛氨涓嶈兘鍐嶆寜棣栭〉鎸夐挳
		}
		firstPage(); // 鏄剧ず绗竴椤垫暟鎹�
	});

	$("#allNextPage").click(function() {
	
		var toPage = Number($("#allCurrentPage").text()) + 1; 
		
		if (toPage > pageList.length) {
			pageList.push(row);
		}

		if (toPage-1 == Number($("#allCountPage").text())) {
			return; 
		}
		
		$("#allDataTable").empty(); 
		$.ajax({
			url : "/TeachDocument2/TeachDoc/search",
			type : "post",
			dataType : "json",
			data : {
				"start" : row,
				"length" : 20
			},
			success : function(json) {
				refreshAllData(json, toPage);
			}
		});

	});

	
	$("#allPrevPage").click(function() {
		var toPage = Number($("#allCurrentPage").text()) - 1;

		if (toPage < 1) {
			return; 
		}
		$("#allDataTable").empty(); 

		row = pageList[toPage - 1];

		$.ajax({
			url : "/TeachDocument2/TeachDoc/search",
			type : "post",
			dataType : "json",
			data : {
				"start" : row,
				"length" : 20
			},
			success : function(json) {
				refreshAllData(json, toPage);
			}
		});
	});
	
	$("#allLastPage").click(function() {
		
	});

	
	function refreshAllData(json, toPage) {
		var flag = ""; 
		var j = 0; 
		var temp = "";

		var rowList = json.rowList;

		for (var i = 0; i < rowList.length; i++) {
			
			temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
			temp += "<td width='70' height='40' value='";
			temp += rowList[i].columns.ID+"'>";
			temp += (i+1);
			temp += "</td><td width='120' value='";
			temp += rowList[i].columns.courseNumber+"'>";
			temp += rowList[i].columns.courseNumber;
			temp += "</td><td width='200' value='";
			temp += rowList[i].columns.courseName+"'>";
			temp += rowList[i].columns.courseName;
			temp += "</td><td width='140' value='";
			temp += rowList[i].columns.term+"'>";
			temp += rowList[i].columns.term;		
			temp += "</td><td width='100'>";
			temp += rowList[i].columns.teacher_name;			
			temp += "</td><td width='120'>";
			temp += rowList[i].columns.shenghe;		
			temp += "</td><td width='120'>";
			temp +=rowList[i].columns.nature+"-"+rowList[i].columns.test_method;	
			temp += "</td><td width='120'>";
			temp += rowList[i].columns.score=="0"?"未评分":rowList[i].columns.score;
			temp += "</td><td width='100'>";
			var dirs= rowList[i].columns.term+"/"+rowList[i].columns.courseNumber+"/"+rowList[i].columns.teacher_id+"/";
			temp += "<input type='button' value='详细' onclick='showDetail(\""+dirs+"\","+rowList[i].columns.id+",\""+realNature(rowList[i].columns.nature+"-"+rowList[i].columns.test_method,rowList[i].columns.experiment_time)+"\")' />"; 
			temp += "</td></tr>";
		}

		$("#allDataTable").append(temp);
		$("#allCountPage").text(json.countPage);
		$("#allCurrentPage").text(toPage);
		$("#allPageTable").show();

	}

});

function showDetail(dirs,taskID,courseNature){
	parent.$("#mainFrame").attr("src","CourseDoc/docdetail.html?taskID="+taskID+"&courseNature="+courseNature+"&dirs="+dirs);
}

function realNature(courseNature,time){
	var realCourseNature="";
	if("必修-考试"==courseNature){
		if("0"==time)
		    realCourseNature="1000";//必修-考试-无实验
		else
			realCourseNature="1001";
	}	
	else if("必修-考查"==courseNature)
	{
		if("0"==time)
		    realCourseNature="1010";//必修-考试-无实验
		else
			realCourseNature="1011";
	}
	else if("选修-考查"==courseNature)
	{
		if("0"==time)
		    realCourseNature="1110";//必修-考试-无实验
		else
			realCourseNature="1111";
	}
	return realCourseNature;		
}

function closepop()
{
	$('.popup_block').fadeOut(function() {
		$('.close').remove();
	});
}
