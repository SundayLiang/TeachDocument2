$(document).ready(function() {
	$('.close, #cancel').bind('click', closepop);

	$("#content").find("[id^='tab']").hide();
	$("#content #tab1").show();

	$('#tabs a').click(function(e) {
		e.preventDefault();
			
			if($(this).closest("a").attr("name")=="tab1"){
				$("#content #tab1").show();
				$("#content #tab2").hide();
				$("#content #tab3").hide();
				firstPage();
			}
			else if($(this).closest("a").attr("name")=="tab2"){
				$("#content #tab2").show();
				$("#content #tab1").hide();
				$("#content #tab3").hide();
			}
			else if($(this).closest("a").attr("name")=="tab3"){
				$("#content #tab3").show();
				$("#content #tab2").hide();
				$("#content #tab1").hide();
			}
	});

	
	firstPage();

	function firstPage() {
		$("#allDataTable").empty();

		$.ajax({
			url : "/TeachDocument2/Course/search",
			type : "post",
			dataType : "json",
			data : {
				"start" : 1,
				"length" : 20,
			},
			success : function(json) {
				refreshAllData(json, 1); 
			}
		});
	}

	$("#allFirstPage").click(function() {
		if (Number($("#allCurrentPage").text()) == 1) {
			return; 
		}
		firstPage();
	});


	$("#allNextPage").click(function() {
	
		var toPage = Number($("#allCurrentPage").text()) + 1;
		
		if (toPage-1 == Number($("#allCountPage").text())) {
			return; 
		}
		
		$("#allDataTable").empty(); 
		$.ajax({
			url : "/TeachDocument2/Course/search",
			type : "post",
			dataType : "json",
			data : {
				"start" : toPage,
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


		$.ajax({
			url : "/TeachDocument2/Course/search",
			type : "post",
			dataType : "json",
			data : {
				"start" : toPage,
				"length" : 20
			},
			success : function(json) {
				refreshAllData(json, toPage);
			}
		});
	});
	
	$("#allLastPage").click(function() {
		
	});

	/**
	 * 鏉堟挸鍤崚鍡涖�夐弫鐗堝祦
	 */
	function refreshAllData(json, toPage) {
		var flag = ""; 
		var j = 0; 
		var temp = "";

		var rowList = json.rowList; 

		for (var i = 0; i < rowList.length; i++) {
			
			temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
			temp += "<td width='70' height='40' value='";
			temp += rowList[i].columns.id+"'>";
			temp += (i+1);
			temp += "</td><td width='200'>"
			temp += rowList[i].columns.course_number;
			temp += "</td><td width='200'>";
			temp += rowList[i].columns.name;
			temp += "</td><td width='140'>";
			temp += "2013-2014-1";//rowList[i].columns.term;
			temp += "</td><td width='120'>";
			temp += rowList[i].columns.name;
			temp += "</td><td width='120'>";
			temp += rowList[i].columns.nature+'-'+rowList[i].columns.test_method;//realNature(rowList[i].columns.courseNature);
			temp += "</td><td width='140'>";
			temp += 1;
			temp += "</td><td width='100'>";
			temp += "<input type='button' value='详细' onclick='showDetail("+rowList[i].columns.id+",\""+rowList[i].columns.term+"\")' />"; 
			temp += "</td></tr>";

		}

		$("#allDataTable").append(temp);
		$("#allCountPage").text(json.countPage);
		$("#allCurrentPage").text(toPage);
		$("#allPageTable").show();

	}

});

function showDetail(id,term){
	parent.$("#mainFrame").attr("src","OutlineDoc/docdetail.html?courseID="+id+"&term="+term);
}

function realNature(courseNature){
	var realCourseNature="";
	if("100"==courseNature)
		realCourseNature="必修-考试";
	else if("101"==courseNature)
		realCourseNature="必修-考查";
	else if("111"==courseNature)
		realCourseNature="选修-考查";
	return realCourseNature;			
}

function closepop()
{
	$('.popup_block').fadeOut(function() {
		$('.close').remove();
	});
}
