$(document).ready(function () {

    $("#nocticeDetailData").hide();
    $("#totalNotice").show();
    showAllData();
    showChartData();

    $('.small_rec').mouseover(function () {
        $(this).append('<div id="fade" style="background-color:#333;width:83px;height:83px;filter:alpha(opacity=80); -webkit-opacity:0.8;"></div');
//	   		 $('#fade').find('p').fadeIn();
        $(this).find('p').fadeIn(200);
    });

    $('.small_rec').mouseleave(function () {
        $('.small_rec').children().fadeOut(200);
    });
    /**
     * 下一页按钮
     */
    $("#allNextPage").click(function () {

        var toPage = Number($("#allCurrentPage").text()) + 1; // 字符串页数转成数字然后加1
        //如果已到达最后一页，则下一页按钮失效
        if (toPage - 1 == Number($("#allCountPage").text())) {
            return;
        }
        getNoticePage(toPage);
    });

    /**
     * 上一页按钮
     */
    $("#allPrevPage").click(function () {
        var toPage = Number($("#allCurrentPage").text()) - 1;
        if (toPage < 1) {
            return; // 如果当前是第一页则不能点击上一页按钮
        }
        getNoticePage(toPage);
    });
    getNoticePage(1);


    /**
     * 下一页按钮
     */
    $("#anounceNextPage").click(function () {

        var toPage = Number($("#anounceCurrentPage").text()) + 1; // 字符串页数转成数字然后加1
        //如果已到达最后一页，则下一页按钮失效
        if (toPage - 1 == Number($("#anounceCountPage").text())) {
            return;
        }
        getAnouncePage(toPage);
    });

    /**
     * 上一页按钮
     */
    $("#anouncePrevPage").click(function () {
        var toPage = Number($("#anounceCurrentPage").text()) - 1;
        if (toPage < 1) {
            return; // 如果当前是第一页则不能点击上一页按钮
        }
        getAnouncePage(toPage);
    });
    getAnouncePage(1);

});


function getAnouncePage(page) {
    $.ajax({
        url: "/stuenroll/anounce/search",
        type: "post",
        dataType: "json",
        data: {
            "start": (page - 1) * 11,
            "length": 11
        },
        success: function (json) {
            refreshAllAnounce(json, page);
        }
    });
}

function getNoticePage(page) {
    $.ajax({
        url: "/stuenroll/notice/search",
        type: "post",
        dataType: "json",
        data: {
            "start": (page - 1) * 7,
            "length": 7
        },
        success: function (json) {
            refreshAllData(json, page);
        }
    });
}

function refreshAllData(json, toPage) {
    var temp = ""; // 向画面里面输出的内容
    var rowList = json.rowList; // 报名数据
    $("#indexFreamArea_1").empty();

    temp += "<tr height='34'>"
    temp += "<th colspan='3' class='f1'>信息通知</th></tr>";
    temp += "<tr height='10'></tr>";
    var i;
    for (i = 0; i < rowList.length; i++) {
        temp += "<tr height='30px' style='padding:0px;' onclick='showDetail(" + rowList[i].columns.id + ")'>";
        temp += "<td width='74' class='f2'>" + rowList[i].columns.level + "</td>";
        temp += "<td class='f3'>【" + rowList[i].columns.title + "】" + rowList[i].columns.content.substring(0, 24) + "...</td>";
        temp += "<td class='f3'>" + rowList[i].columns.time + "</td></tr>";
    }
    if (i != 7) {
        temp += "<tr height='100%' style='padding:0px;'>";
    }

    $("#indexFreamArea_1").append(temp);
    $("#allCountPage").text(json.countPage);
    $("#allCurrentPage").text(toPage);
    $("#allPageTable").show();
}

function refreshAllAnounce(json, toPage) {
    var temp = ""; // 向画面里面输出的内容
    var rowList = json.rowList; // 报名数据
    $("#notice_content_table").empty();

    for (i = 0; i < rowList.length; i++) {
        temp += "<tr><td height='20px'><p>【" + rowList[i].columns.title + "】" + rowList[i].columns.content + "</p></td></tr>";
    }

    if (i != 11) {
        temp += "<tr height='100%' style='padding:0px;'>";
    }

    $("#notice_content_table").append(temp);
    $("#anounceCountPage").text(json.countPage);
    $("#anounceCurrentPage").text(toPage);
    $("#page_change").show();
}

function showDetail(id) {
    $("#myIframe").attr("src", "system/noticeDetail.html?id=" + id);
    $("#nocticeDetailData").show();
    $("#totalNotice").hide();

}

//六个数据
function showAllData() {
//新报名
    $.ajax({
        url: "/stuenroll/enroll/numberOfNewEnroll",
        type: "post",
        dataType: "json",
        data: {},
        success: function (json) {
            $("#numberOfNewEnroll").text(json);
        }
    });
//已归档
    $.ajax({
        url: "/stuenroll/record/numberOfRecord",
        type: "post",
        dataType: "json",
        data: {},
        success: function (json) {
            $("#numberOfRecord").text(json);
        }
    });
//未归档
    $.ajax({
        url: "/stuenroll/record/numberOfNoRecord",
        type: "post",
        dataType: "json",
        data: {},
        success: function (json) {
            $("#numberOfNoRecord").text(json);
        }
    });
//报名数
    $.ajax({
        url: "/stuenroll/enroll/numberOfenroll",
        type: "post",
        dataType: "json",
        data: {},
        success: function (json) {
            $("#numberOfenroll").text(json);
        }
    });
//开班数
    $.ajax({
        url: "/stuenroll/class/numberOfClass",
        type: "post",
        dataType: "json",
        data: {},
        success: function (json) {
            $("#numberOfClass").text(json);
        }
    });
//专业数
    $.ajax({
        url: "/stuenroll/specialty/numberOfSpecialty",
        type: "post",
        dataType: "json",
        data: {},
        success: function (json) {
            $("#numberOfSpecialty").text(json);
        }
    });
}

function showChartData() {
//
    $.ajax({
        url: "/stuenroll/record/personsOfspecialty",
        type: "post",
        dataType: "json",
        data: {},
        success: function (json) {
            specialtyChart(json);
        }
    });

//
    $.ajax({
        url: "/stuenroll/record/personOfSchoolYear",
        type: "post",
        dataType: "json",
        data: {},
        success: function (json) {
//			$("#numberOfSpecialty").text(json);
            schoolChart(json);
        }
    });

    $.ajax({
        url: "/stuenroll/record/personsOfPlace",
        type: "post",
        dataType: "json",
        data: {},
        success: function (json) {
//			$("#numberOfSpecialty").text(json);
            placeChart(json);
        }
    });
}


function specialtyChart(json) {
//	var chartdata=[]
//	for(var item in json){
//		chartdata.add([item.name,item.num]);
//	}
    $('#chart_pie').highcharts({
        colors: ['#EF3C7D', '#21C154', '#22BEEF', '#FFC100', '#1FBBA6', '#FF5252'],
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        title: {
            padding: 0,
            margin: 0,
            text: '专业报名比例'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend: {
            padding: 0,
            margin: 0
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: json
        }]
    });

}


function schoolChart(json) {


    $(function () {
        $('#container').highcharts({
            title: {
                text: '各学校每年报名人数',
                x: -20 //center
            },
            xAxis: {
                categories: json.years
            },
            yAxis: {
                title: {
                    text: '报名人数 (名)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '名'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: json.datas
        });
    });

}

function placeChart(json) {
    $(function () {
        $('#right_chart').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: '各地点报名人数统计'
            },
            xAxis: {
                categories: json[0]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (名)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} 名</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: '地点人数',
                data: json[1]

            }
            ]
        });
    });
}

function popEnrollQuery() {
    $(window.parent.document).find("#mainFrame").attr("src", "enroll/enrollFrame.html?request=" + "popquery");
}

function popRecordQuery() {
    $(window.parent.document).find("#mainFrame").attr("src", "enroll/enrollFrameFile.html?request=" + "popquery");
}

function popClassQuery() {
    $(window.parent.document).find("#mainFrame").attr("src", "enroll/enrollFrameClass.html?request=" + "popquery");
}

function popSchoolQuery() {
    $(window.parent.document).find("#mainFrame").attr("src", "enroll/enrollFrameSchool.html");
}


function popSpecialtyQuery() {
    $(window.parent.document).find("#mainFrame").attr("src", "enroll/enrollFrameMajor.html");
}
//6
function popUserQuery() {
    $(window.parent.document).find("#mainFrame").attr("src", "enroll/enrollFrameUserManagement.html");
}

function addClass() {
    $(window.parent.document).find("#mainFrame").attr("src", "enroll/enrollFrameClass.html?request=" + "add");
}

function addSchool() {
    $(window.parent.document).find("#mainFrame").attr("src", "enroll/enrollFrameSchool.html?request=" + "add");
}

function addSpecialty() {
    $(window.parent.document).find("#mainFrame").attr("src", "enroll/enrollFrameMajor.html?request=" + "add");
}

function adduser() {
    $(window.parent.document).find("#mainFrame").attr("src", "enroll/enrollFrameUserManagement.html?request=" + "add");
}

function addNotice() {
    $(window.parent.document).find("#mainFrame").attr("src", "system/top.html?request=" + "add");
}

function SystemState() {
    $(window.parent.document).find("#mainFrame").attr("src", "system/top.html?request=" + "");
}
