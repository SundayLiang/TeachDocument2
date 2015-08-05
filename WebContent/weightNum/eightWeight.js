
$(document).ready(function () {
    $('.close, #cancel').bind('click', closepop);
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
    loadNatureMenu();

    function loadNatureMenu(){
        $("#natureMenu").empty();
    }


    var row = 0; //查询数据的起始位置
    /*
     * 记录每页的起始数据位置
     */
    var pageList = new Array();
    pageList.push(row); //记录每页的数据起始位置

    /**
     * 跳转到第一页
     */
    function firstPage() {
        row = 0; //初始化查询数据起始位置
        $("#allDataTable").empty(); // 清空当前内容

        $.ajax({
            url: "/TeachDocument2/weight/search",
            type: "post",
            dataType: "json",
            success: function (json) {
                refreshAllData(json);
            }
        });
    }

    $("#subUpdate").click(function () {
        var weightall=0;
        $('#allDataTable tr').each(function () {
            weightall += parseFloat($(this).children('td').eq(2).children('input').val());
        });
        if((weightall>1?(weightall-1):(1-weightall))<0.00000000001) {
            $('#allDataTable tr').each(function () {

                $.ajax({
                    url: "/TeachDocument2/weight/changeNum",
                    type: "post",
                    dataType: "json",
                    data: {
                        "id": $(this).children('td').eq(0).html(),
                        "num": $(this).children('td').eq(2).children('input').val()
                    },
                    success: function (flag) {
                        //if(flag){
                        //    alert("修改成功！");
                        //    parent.$("#mainFrame").attr("src", "evaluate/leaderEvaluate.html");
                        //}
                    }
                })
            });

            alert("修改成功！");
            firstPage();
        }
        else {
            alert("权重和不是1，无法提交！请改正。");
        }
    });
    $("#osub").click(function () {
        var weightall=0;
        $('#natureitems tr').each(function () {
            weightall += parseFloat($(this).children('td').eq(1).children('input').val());
        });
        if((weightall>1?(weightall-1):(1-weightall))<0.00000000001) {
            $('#natureitems tr').each(function () {

                $.ajax({
                    url: "/TeachDocument2/weight/changeitem",
                    type: "post",
                    dataType: "json",
                    data: {
                        "id": $(this).children('td').eq(0).children('input').val(),
                        "num": $(this).children('td').eq(1).children('input').val()

                    },
                    success: function (flag) {
                    }
                })
            });
            alert("修改成功！");
        }
        else {
            alert("权重和不是1，无法提交！请改正。");
        }
    });

    /**
     * 更新数据内容
     */
    function refreshAllData(json) {
        var temp = ""; // 用来写入HTML语段

        var rowList = json.resultList; // 获取后台数据

        for (var i = 0; i < rowList.length; i++) {
            /*
             * 循环显示所有后台数据条目
             */

            temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
            temp += "<td width='200' height='40' value='";
            temp += rowList[i].columns.id + "'>";
            temp += rowList[i].columns.id;
            temp += "</td><td width='500' value='";
            temp += rowList[i].columns.id + "'>";
            temp += rowList[i].columns.element;
            temp += "</td><td width='500' value='";
            temp += rowList[i].columns.id + "'>";
            temp += "<input type='text' name='weight' value='"+rowList[i].columns.weight+"'/>";
            temp += "</td>";

            temp += "</tr>";
            row++;

        }

        $("#allDataTable").append(temp);
        $("#allPageTable").show();

    }

    function refreshNatureItem(json) {
        $("#natureitems").empty();
        var temp = ""; // 用来写入HTML语段

        var rowList = json.resultList; // 获取后台数据

        for (var i = 0; i < rowList.length; i++) {
            /*
             * 循环显示所有后台数据条目
             */

            temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
            temp += "<td width='600' value='";
            temp += rowList[i].columns.id + "'>";
            temp += rowList[i].columns.doc_name+"<input type='hidden'value='"+rowList[i].columns.id+"'/>";
            temp += "</td><td width='200' value='";
            temp += rowList[i].columns.id + "'>";
            temp += "<input type='text' name='weight' value='"+rowList[i].columns.weight+"'/>";
            temp += "</td>";

            temp += "</tr>";
            row++;

        }

        $("#natureitems").append(temp);
        $("#buttonTable").show();

    }

    $("table[name='natureMenu'] td").click(function () {
        var text = $(this).text();
        $("table[name='natureMenu'] .onclickblue").attr("class", "blue");
        $(this).attr("class", "onclickblue");
        $.ajax({
            url: "/TeachDocument2/weight/searchNature",
            type: "post",
            dataType: "json",
            data: {
                "natureName":text
            },
            success: function (json) {
                refreshNatureItem(json);
            }
        })
    });

});





function closepop() {
    $('.popup_block').fadeOut(function () {
        $('.close').remove();
    });
}
