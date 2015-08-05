
$(document).ready(function () {
    /*
     * tab之间的互相切换
     */
    $("#content").find("[id^='tab']").hide();
    $("#content #tab1").show();
    // Show first tab's content

    $('#tabs a').click(function (e) {
        e.preventDefault();

        if ($(this).closest("a").attr("name") == "tab1") {
            $("#content #tab1").show();
            $("#content #tab2").hide();
            $("#content #tab3").hide();
            firstPage();
        }
        else if ($(this).closest("a").attr("name") == "tab2") {
            $("#content #tab2").show();
            $("#content #tab1").hide();
            $("#content #tab3").hide();
        }
        else if ($(this).closest("a").attr("name") == "tab3") {
            $("#content #tab3").show();
            $("#content #tab1").hide();
            $("#content #tab2").hide();
        }
    });


    firstPage();
    function firstPage() {
        row = 0; //初始化查询数据起始位置
        $("#allDataTable").empty(); // 清空当前内容

        $.ajax({
            url: "/TeachDocument2/TaskStandard/searchAll",
            type: "post",
            dataType: "json",
            success: function (json) {
                refreshAllData(json);
            }
        });
    }


    /**
     * 更新数据内容
     */
    function refreshAllData(json) {
        var temp = ""; // 用来写入HTML语段

        var rowList = json; // 获取后台数据

        for (var i = 0; i < rowList.length; i++) {
            /*
             * 循环显示所有后台数据条目
             */

            temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
            temp += "<td width='100' height='40' value='";
            temp += rowList[i].doc_name + "'>";
            temp += (i+1);
            temp += "</td><td width='600'  id='11"+(i+1)+"'  value='";
            temp += rowList[i].doc_name + "'>";
            temp += rowList[i].doc_name;
            temp += "</td><td width='200' value='";
            temp += rowList[i].doc_name + "'>";
            temp += "<input type='text' readonly='readonly' style='outline:none;border: none;'  id='22"+(i+1)+"'  name='weight' value='"+(rowList[i].deadline==null?"无":rowList[i].deadline)+"'/>";
            temp += "</td><td width='200' value='";
            temp += rowList[i].doc_name + "'>";
            temp += "<input type='text' name='weight' id='"+(i+1)+"' readonly='readonly' style='outline:none;border: none;'  value='"+"一周"+"'/>";
            temp += "</td><td width='100' value='";
            temp += rowList[i].doc_name + "'>";
            temp += "<input type='button'  onclick=updateTime('11"+(i+1)+"','22"+(i+1)+"') value='修改'/>";
            temp += "</td>";
            temp += "</tr>";
        }
        $("#allDataTable").append(temp);
    }

});


function selectFile(){
	document.getElementById("btn_file").click();
}

function nimei(){
	alert("/TeachDocument2/UpDoc/up");
	document.getElementById("wps").click();
}

function updateTime(docname,time) {
	$(window.parent.document).find('#main').append('<div id="fade" onclick="closeQuery()"></div>'); 
	$(window.parent.document).find('#fade').css({'filter' : 'alpha(opacity=80)','float':'left'}).fadeIn(); 
	$(window.parent.document).find('#popup_query')
	.append('<a onclick="closeQuery()" class="close"><img style="border:none;margin: 0px 0px -25px 0;position:absolute;left:520px;z-index:9px;top:-20px" src="pic/close_pop.png" class="btn_close" title="关闭" alt="Close" /></a>')
	.append('<iframe id="frame_detail" frameborder="0" height="680" width="580" src="/TeachDocument2/System/popupdate.html?time='+time+'&name='+docname+'"></iframe>');
	$(window.parent.document).find('#popup_query').css({'margin-top' : -130,'margin-left' : -290});
	$(window.parent.document).find('#popup_query').show();
}