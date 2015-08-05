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

	function firstPage() {
		$("#allDataTable").empty();

		$.ajax({
			url : "/TeachDocument2/CourseTest/searchAll",
			type : "post",
			dataType : "json",
			data : {
				"start" : 0,
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
			url : "/TeachDocument2/CourseTest/searchAll",
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
			url : "/TeachDocument2/CourseTest/searchAll",
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
			//start by lfl	
			//没审核过的考试不能分配监考
			
			
			if(rowList[i].columns.state=="已审核"){
			
			//end by lfl
			temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
			temp += "<td width='70' height='40' value='";
			temp += rowList[i].columns.id+"'>";
			temp += (i+1);
			temp += "</td><td width='130'>";
			temp += rowList[i].columns.coursename;
			temp += "</td><td width='140'>";
			temp += rowList[i].columns.term;
			temp += "</td><td width='120'>";
			temp += rowList[i].columns.teachername;
			temp += "</td><td width='120'>";
			temp += rowList[i].columns.testtime==null?"未确定":rowList[i].columns.testtime;
			temp += "</td><td width='120'>";
			temp += rowList[i].columns.testplace==null?"未确定":rowList[i].columns.testplace;
			//temp += "</td><td width='140'>";
			//temp += rowList[i].columns.state;
			temp += "</td><td width='100'>";
			//start by lfl			
			temp += rowList[i].columns.isArrToLab!=null?"已配备":"未配备";
			//temp += rowList[i].columns.isArrToLab==0?"已配备":rowList[i].columns.isArrToLab;
			//temp += rowList[i].columns.isArrToLab;
			//end by lfl	
			temp += "</td><td width='100'>";
			temp += "<input type='button' value='配备人员' onclick='updateTest("+rowList[i].columns.id+","+rowList[i].columns.need_person+")' />"; 
			temp += "</td><td width='100'>";
			temp += "<input type='button' value='下载申请表' onclick='downLoadPdf("+rowList[i].columns.id+")' />"; 
			temp += "</td></tr>";
			
			}

		}

		$("#allDataTable").append(temp);
		$("#allCountPage").text(json.countPage);
		$("#allCurrentPage").text(toPage);
		$("#allPageTable").show();

	}

});

function updateTest(id,num){
	
	$(window.parent.document).find('#main').append('<div id="fade" onclick="closeQuery()"></div>'); 
	$(window.parent.document).find('#popup_query')
	.append('<a onclick="closeQuery()" class="close"><img style="border:none;margin: 0px 0px -25px 0;position:absolute;left:515px;z-index:9;top:0px" src="pic/close_pop.png" class="btn_close" title="关闭" alt="Close" /></a>')
	.append('<iframe id="frame_detail" frameborder="0" height="500" width="550" src="/TeachDocument2/invigilatorArrange/poplab.html?id='+id+'&num='+num+'"></iframe>');
	$(window.parent.document).find('#popup_query').css({'margin-top' : 200,'margin-left' : 500});
	$(window.parent.document).find('#popup_query').show();

	
	/*$(window.parent.document).find('#main').append('<div id="fade" onclick="closeQuery()"></div>'); 
	$(window.parent.document).find('#fade').css({'filter' : 'alpha(opacity=80)','float':'left'}).fadeIn(); 
	$(window.parent.document).find('#popup_query')
	.append('<a onclick="closeQuery()" class="close"><img style="border:none;margin: 0px 0px -25px 0;position:absolute;left:520px;z-index:9px;top:-20px" src="pic/close_pop.png" class="btn_close" title="关闭" alt="Close" /></a>')
	.append('<iframe id="frame_detail" frameborder="0" height="680" width="580" src="/TeachDocument2/testArrangement/popperson.html?id='+id+'&num='+num+'"></iframe>');
	$(window.parent.document).find('#popup_query').css({'margin-top' : -130,'margin-left' : -290});
	$(window.parent.document).find('#popup_query').show();*/
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
