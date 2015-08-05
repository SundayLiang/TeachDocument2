$(function(){
    $.contextMenu({
        selector: '.dataTable tr', 
        callback: function(key, options) {
        	switch(key)
        	{
        	case "detail":
        		break;
        	case "inquire":
        		$('#tab4').show();
				stateId="";
        		break;
        	case "divide":
        		showpop();
        		break;
        	case "export":
        		$.ajax({
        			url : "/stuenroll/enroll/pdf",
        			type : "post",
        			dataType : "json",
        			data : {
        				"pid" : $(this).find("td").eq(2).text()
        			},
        			success : function() {
        			}
        		});
     //   		window.location.href="/enroll/pdf?pid="+$(this).find("td").eq(2).text();
    //    		alert("/regist/pdf?pid="+$(this).find("td").eq(2).text());
        		break;
        	}
           
           
        },
        items: {
            "edit": {name: "详细信息",icon:"edit", accesskey: "e"},
            "sep1": "---------",
            "inquire": {name: "条件查询",icon:"",accesskey: "i"},
            "sep2": "---------",
            "divide": {name: "学员分班",icon:"", accesskey: "divide"},
            "sep3": "---------",
            "export": {name: "导出PDF报名表",icon:"", accesskey: "export"}
        }
    });
});
function showpop()
{
	
//	$('body').append('<div id="fade"></div>'); 
//	$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn(); 
	$('#popup_name').fadeIn().css({'width' : Number(500)}).prepend('<a onclick="closepop()" class="close"><img style="border:none" src="../pic/close_pop.png" class="btn_close" title="关闭" alt="Close" /></a>');
	var popMargTop = ($('#popup_name').height() +200) / 2;
	var popMargLeft = ($('#popup_name').width() + 80) / 2;
	$('#popup_name').css({'margin-top' : -popMargTop,'margin-left' : -popMargLeft});
	changeType();
	changeEdu();
}

function changeEdu(){
	var search="specialty/search";
	if(!$("#specialty option:selected").val()){
	if($("#edu option:selected").val()!=null &&$("#edu option:selected").val()!="")
		search="school/searchAllSpec";
	$("#specialty").empty();
	$.ajax({
		url : "/stuenroll/"+search,
		type : "post",
		dataType : "json",
		data : {
			"school_id" :$("#edu option:selected").val()
		},
		success : function(json) {
			if(json!=null){
				var list=json.rowList;
				var html="<option value=''>-选择-</option>";
				for(var i=0;i<list.length;i++){
					html+="<option value='"+list[i].id+"' name= '"+list[i].specialty_name+"'>"+list[i].specialty_name+"</option>";
				}
				$("#popup_name #specialty").append(html);				
			}
			else
				alert("加载失败");
		}
	});	
	}	
	if($("#edu option:selected").val()!=null && $("#specialty option:selected").val()){
	selectclass();}
}

function changeType(){
	var search="school/search";
	if(!$("#edu option:selected").val()){
	if($("#specialty option:selected").val()!=null && $("#specialty option:selected").val()!="")
		search="specialty/searchAllSchool";
	$("#edu").empty();
	$.ajax({
		url : "/stuenroll/"+search,
		type : "post",
		dataType : "json",
		data : {
			"specialty_id" : $("#specialty option:selected").val()
		},
		success : function(json) {
			if(json!="false"){
				var list=json.rowList;
				var html="<option value=''>-选择-</option>";
				for(var i=0;i<list.length;i++){
					html+="<option value='"+list[i].id+"' name= '"+list[i].name+"'>"+list[i].name+"</option>";
				}
				$("#popup_name #edu").append(html);				
			}
			else
				alert("加载失败");
		}
	});	
	}
	if($("#edu option:selected").val()!=null && $("#specialty option:selected").val()){
	selectclass();}
}


function selectclass(){
	if($("#edu option:selected").val()!=null && $("#specialty option:selected").val()){
		
		$("#class").empty();
		$.ajax({
			url : "/stuenroll/class/search",
			type : "post",
			dataType : "json",
			data : {
				"specialty" : $("#specialty option:selected").attr("name"),
				"school" : $("#edu option:selected").attr("name"),
				"archives":0
			},
			success : function(json) {
				if(json!="false"){
					alert(json);
					var list=json;
					var html="<option value=''>-选择-</option>";
					for(var i=0;i<list.length;i++){
						html+="<option value='"+list[i].columns.id+"'>"+$("#specialty option:selected").attr("name")+list[i].columns.name+"</option>";
					}
					$("#popup_name #class").append(html);				
				}
				else
					alert("加载失败");
			}
		});		
	}
	else
		alert("请您先填写专业与学校");
}

function submitUpdate(){
	if($("#edu option:selected").val()!=null && $("#specialty option:selected").val()&& $("#calss option:selected").val()!=null){
		$.ajax({
			url : "/stuenroll/enroll/divide",
			type : "post",
			dataType : "json",
			data : {
				"id":$(this).find("td").eq(0).text(),
				"specialty" : $("#specialty option:selected").val(),
				"school" : $("#edu option:selected").val(),
				"class":$("#edu option:selected").val(),
				"state":8
			},
			success : function(json) {
				if(json=="true"){
					alert("分班成功！");
				}
				else
					alert("分班失败！");
			}
		});
	}	
}


function closepop()
{
	$('.popup_block').fadeOut(function() {
		$('.close').remove();
	});
}
$(document).ready(function() {
	$('.close, #cancel').bind('click', closepop);
	/*
	 * Tab选项卡插件代码
	 */
	$("#content").find("[id^='tab']").hide();
	$("#content #tab1").show();
	// Show first tab's content
	stateId="";
	$('#tabs a').click(function(e) {
		e.preventDefault();
			
			if($(this).closest("a").attr("name")=="tab1")
				stateId="";
			else if($(this).closest("a").attr("name")=="tab2")
				stateId="6";
			else if($(this).closest("a").attr("name")=="tab3")
				stateId="1";
			if($(this).closest("a").attr("name")=="tab4")
				{
				//$("#tab1").hide();
				$('#tab4').show();
				stateId="";
				}
			else{
				$("#tab4").hide();
				//$('#tab1').show();
			}
			firstPage();
	});

	var row = 0; // 已经显示的记录数
	/*
	 * 保存分页起始值的数组，该数组记录每次点击下一页时候的分页起始值
	 */
	var pageList = new Array();
	pageList.push(row); // 先保存第一页的起始值

	/**
	 * 显示第一页数据
	 */
	function firstPage() {
		row = 0; // 先要重置row变量
		$("#allDataTable").empty(); // 清空表格

		$.ajax({
			url : "/stuenroll/enroll/search",
			type : "post",
			dataType : "json",
			data : {
				"start" : row,
				"length" : 35,
				"stateId":stateId
			},
			success : function(json) {
				refreshAllData(json, 1); // 输出数据
			}
		});
	}

	firstPage(); // 显示第一页数据

	/**
	 * 首页按钮
	 */
	$("#allFirstPage").click(function() {
		if (Number($("#allCurrentPage").text()) == 1) {
			return; // 如果当前是第一页就不能再按首页按钮
		}
		firstPage(); // 显示第一页数据
	});

	/**
	 * 下一页按钮
	 */
	$("#allNextPage").click(function() {
	
		var toPage = Number($("#allCurrentPage").text()) + 1; // 字符串页数转成数字然后加1
		/*
		 * 为了避免依次点击下一页、上一页、下一页，这种情况下反复把下一页的分页起始位置写到pageList里面，
		 * 这里判断一下向下翻页的页数是否没有在pageList记录过，再决定是否向pageList保存数据
		 */
		if (toPage > pageList.length) {
			pageList.push(row);
		}
		//如果已到达最后一页，则下一页按钮失效
		if (toPage-1 == Number($("#allCountPage").text())) {
			return; 
		}
		
		$("#allDataTable").empty(); // 清空表格
		$.ajax({
			url : "/stuenroll/enroll/search",
			type : "post",
			dataType : "json",
			data : {
				"start" : row,
				"length" : 35,
				"stateId":stateId
			},
			success : function(json) {
				refreshAllData(json, toPage);
			}
		});

	});

	/**
	 * 上一页按钮
	 */
	$("#allPrevPage").click(function() {
		var toPage = Number($("#allCurrentPage").text()) - 1;

		if (toPage < 1) {
			return; // 如果当前是第一页则不能点击上一页按钮
		}
		$("#allDataTable").empty(); // 清空数据

		row = pageList[toPage - 1]; // 从数组中取出上一页的起始值，这一点很重要

		$.ajax({
			url : "/stuenroll/enroll/search",
			type : "post",
			dataType : "json",
			data : {
				"start" : row,
				"length" : 35,
				"stateId":stateId
			},
			success : function(json) {
				refreshAllData(json, toPage);
			}
		});
	});
	
	$("#allLastPage").click(function() {
		
	});

	/**
	 * 输出分页数据
	 */
	function refreshAllData(json, toPage) {
		var flag = ""; // 保存日期，用于判断月份是否改变
		var j = 0; // 月份单元格的个数
		var temp = ""; // 向画面里面输出的内容

		var rowList = json.rowList; // 报名数据

		for (var i = 0; i < rowList.length; i++) {
			/*
			 * 如果超出了35行就退出循环
			 */
			if (i > rowList.length - j * 2 - 1) {
				break;
			}
			var create_time = rowList[i]['create_time'];
			/*
			 * 月份变更输出月份单元格
			 */
			if (flag != create_time) {
				temp += "<tr>";
				temp += "<td colspan='9' class='f1' height='60'>";
				temp += create_time;
				temp += "</td></tr>";
				flag = create_time; // 更新flag保存的月份
				j++;
			}
			temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
			temp += "<td width='70' height='28' value='";
			temp += rowList[i].id+"'>";
			temp += rowList[i].id;
			temp += "</td><td width='100'>";
			temp += rowList[i].name;
			temp += "</td><td width='200'>";
			temp += rowList[i].pid;
			temp += "</td><td width='140'>";
			temp += rowList[i].tel;
			temp += "</td><td width='120'>";
			temp += rowList[i].school != null ? rowList[i].school : '';
			temp += "</td><td width='120'>";
			temp += rowList[i].specialty;
			temp += "</td><td width='120'>";
			temp += rowList[i]['class'] != null ? rowList[i]['class'] : '';
			temp += "</td><td width='120'>";
			temp += rowList[i]['student_id'] != null ? rowList[i].student_id : '';
			temp += "</td><td width='100'>";
			temp += rowList[i]['state'] != null ? rowList[i].state : '';
			temp += "</td></tr>";
			row++;

		}

		$("#allDataTable").append(temp);
		$("#allCountPage").text(json.countPage);
		$("#allCurrentPage").text(toPage);
		$("#allPageTable").show();

	}

});
function inSearch() {
	inSearchArea = true;
}
function outSearch() {
	inSearchArea = false;
}
