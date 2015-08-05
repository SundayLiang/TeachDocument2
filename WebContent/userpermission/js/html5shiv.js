$(document).ready(function(){
  step1();
  step2();
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