var c,t;

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

loadAllData();
	
	function loadAllData(){
		//alert("loadAllData");																//test
		$("#allDataTable").empty();
		//alert("empty");																	//test
		$.ajax({
			url : "/TeachDocument2/CourseTest/searchByCourse",
			type : "post",
			dataType : "json",
			
			success : function(json) {
				//alert("json succeed");
				refreshAllData(json); 
			}
		});
	}
	



	/**
	 * 鏉堟挸鍤崚鍡涖�夐弫鐗堝祦
	 */
	function refreshAllData(json) {
		var flag = ""; 
		var j = 0; 
		var temp = "";

		var rowList = json.rowList; 

		for (var i = 0; i < rowList.length; i++) {
			
			temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
			temp += "<td width='50' height='40' value=''>";
			//alert(rowList[i].columns.id);											//test
			//temp += rowList[i].columns.id+"'>";
			temp += (i+1);
			temp += "</td><td width='160'>";
			temp += rowList[i].columns.term;
			temp += "</td><td width='150'>";
			temp += rowList[i].columns.course_name;
//			temp += "</td><td width='120'>";
//			temp += rowList[i].columns.apply_teacher_name;
			temp += "</td><td width='100'>";
			temp += "<input type='button' value='详细安排' onclick=showdetail('"+rowList[i].columns.course_id+"','"+rowList[i].columns.term+"') />"; 
			temp += "</td><td width='150'>";
			temp += "<input type='button' value='下载申请表' onclick='downLoadPdf("+rowList[i].columns.id+")' />"; 
			temp += "</td></tr>";

		}

		$("#allDataTable").append(temp);
	//	$("#allCountPage").text(json.countPage);
	//	$("#allCurrentPage").text(toPage);
	//	$("#allPageTable").show();

	}

});

function showdetail(course_id,term){
	parent.$("#mainFrame").attr("src", "testArrangement/examinetest.html?course_id='"+course_id+"'&term='"+term+"'");    //
	
}

function downLoadPdf(id){
	window.location.href="../CourseTest/downLoadPdf?id="+id;
}

function closepop()
{
	$('.popup_block').fadeOut(function() {
		$('.close').remove();
	});
}
