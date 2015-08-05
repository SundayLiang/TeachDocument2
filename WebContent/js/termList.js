/**
 * Created by j on 2015/6/4.
 */
$(document).ready(function(){
    var t = new Date();
    var y = t.getFullYear();
    var temp = "";
    for(var i=y; i>2006; i--){
        temp+="<option value='"+i+"-"+(i+1)+"-2'>"+i+"-"+(i+1)+"-2</option>";
        temp+="<option value='"+i+"-"+(i+1)+"-1'>"+i+"-"+(i+1)+"-1</option>";
    }

    //temp+="<option value='"+(y-1)+"-"+y+"-2'>"+(y-1)+"-"+y+"-</option>";
    //temp+="<option value='"+(y-1)+"-"+y+"-1'>"+(y-1)+"-"+y+"-1</option>";
    //temp+="<option value='"+(y-2)+"-"+(y-1)+"-2'>"+(y-2)+"-"+(y-1)+"-2</option>";
    //temp+="<option value='"+(y-2)+"-"+(y-1)+"-1'>"+(y-2)+"-"+(y-1)+"-1</option>";
    //temp+="<option value='"+(y-3)+"-"+(y-2)+"-2'>"+(y-3)+"-"+(y-2)+"-2</option>";
    //temp+="<option value='"+(y-3)+"-"+(y-2)+"-1'>"+(y-3)+"-"+(y-2)+"-1</option>";
    //temp+="<option value='"+(y-4)+"-"+(y-3)+"-2'>"+(y-4)+"-"+(y-3)+"-2</option>";
    //temp+="<option value='"+(y-4)+"-"+(y-3)+"-1'>"+(y-4)+"-"+(y-3)+"-1</option>";
    $("#term").append(temp);
})