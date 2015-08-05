$(document).ready(function() {

	$(window).bind('keydown',function(event) {
	    if (event.keyCode == "13") {
	        //回车执行查询
	    	$('#loginBtn').click();
	    }
	});
	
	$('#loginBtn').click(function() {
		$.ajax({
			url : "/TeachDocument2/User/login",
			type : "post",
			dataType : "text",
			data : {
				"usernumber" : $("#usernumber").val(),
				"password" : $("#password").val()
			},
			success : function(json) {
				if ("true"==json) {	
					comein();
				}
				else
					failed();
			}
		});
	});
});

function comein(){
	alert("登录成功!666");
	window.location.href="index.html";
}

function failed(){
	alert("用户名或密码错误，请重新输入！！！");
}