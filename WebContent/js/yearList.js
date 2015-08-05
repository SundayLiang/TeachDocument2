/**
 * Created by j on 2015/6/4.
 */
$(document).ready(function(){
    var t = new Date();
    var y = t.getFullYear();
    var temp="";
    for(var i=y; i>2006; i--){
        temp+="<option value='"+(i+1)+"'>"+(i+1)+"</option>";
    }
    //var temp = "<option value='"+(y+1)+"'>"+(y+1)+"</option>";
    //temp+="<option value='"+y+"'>"+y+"</option>";
    //temp+="<option value='"+(y-1)+"'>"+(y-1)+"</option>";
    //temp+="<option value='"+(y-2)+"'>"+(y-2)+"</option>";
    //temp+="<option value='"+(y-3)+"'>"+(y-3)+"</option>";
    //temp+="<option value='"+(y-4)+"'>"+(y-4)+"</option>";
    $("#teachYear").append(temp);
})
