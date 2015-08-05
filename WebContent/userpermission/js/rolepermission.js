/**
 * Created by j on 2015/5/20.
 */
var userid="";
$(document).ready(function(){
    userid=getvl("id");

    step1();
    step2();
    step3();




    //$("#savenew").click(function(){
    //    alert("i am in");
    //    var chk_value ="";
    //    var role=$("#userrole").val();
    //    $('input[name="perm"]:checked').each(function(){
    //        chk_value.push($(this).val());
    //    });
    //    $.ajax({
    //        url:"/TeachDocument2/User/updateRole",
    //        type:"post",
    //        dataType:"json",
    //        data:{
    //            "userid":userid,
    //            "role":role,
    //            "permission":chk_value
    //        },
    //        success: function(json){
    //            putrole(json);
    //        }
    //    })
    //})

})

function step1(){ $.ajax({
    url:"/TeachDocument2/RolePermission/searchRole",
    type:"post",
    dataType:"json",
    data:{},
    success: function(json){
        putrole(json);
    }
})}

function step2(){ $.ajax({ url:"/TeachDocument2/RolePermission/searchPermission",
    type:"post",
    dataType:"json",
    data:{},
    success: function(json){
        putperm(json);
    }})}

function step3(){
    $.ajax({
        url:"/TeachDocument2/User/userRaP",
        type:"post",
        dataType:"json",
        data:{
            "userid": userid
        },
        success: function(json){
            puturole(json);
        }
    })
}

function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};



function putrole(json){
    var temp="";
    for(var i=0; i<json.length; i++) {
        temp += "<option class='myoption' value='"+json[i].id+"'>"+json[i].name+"</option>";

    }
    $('#userrole').append(temp);
}
function putperm(json){
    var temp="";
    for(var i=0; i<json.length; i++){
        if(i%5==0){
            if(i%10==0) {
                temp += "<tr/><tr class='blue'>";
            }
            else
            {
                temp += "<tr/><tr>"
            }
        }
        temp += "<td><input type='checkbox' name='perm' value='"+json[i].id+"'/>"+json[i].name+"<td/>";

    }
    $('#permtable').append(temp);
}

function puturole(json){
    var role=json.role;
    var list=json.list;
    $("option[class='myoption']").each(function (){
        if($(this).val()==role){
            $(this).prop("selected", true);
        }
    });

    for(var i=0; i<list.length; i++) {
        $("input[type='checkbox']").each(function(){
            if($(this).attr("value")==list[i]){
                $(this).prop("checked",true);
            }
        })
    }
}

function jqchk(){
    var a = document.getElementsByName("perm");
    var chk_value =new Array();
    var role=$("#userrole").val();
    for (var i=0; i< a.length; i++){
        if(a[i].checked){
            chk_value.push(a[i].value);
        }
    }
    //$('input[name="perm"]:checked').each(function(){
    //    alert($(this).val());
    //    chk_value.push($(this).val());
    //});

    $.ajax({
        url:"/TeachDocument2/User/updateUserRole",
        type:"post",
        dataType:"text",
        data:{
            "userid":userid,
            "role":role,
            "permission":chk_value
        },
        success: function(text){
            if(text=="yes"){
                alert("修改成功");
                parent.parent.$("#mainFrame").attr("src", "userpermission/manageUser.html");
            }
            if(text=="no")
            {alert("修改出错，请重试！");
            }
        }
    })

}

//function concel(){
//    console.log("Close Modal!");
//    modal.hide();
//    //parent.parent.$("#mainFrame").attr("src", "userpermission/manageUser.html");
//}