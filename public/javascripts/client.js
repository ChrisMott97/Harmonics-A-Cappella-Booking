$(document).ready(function(){
    $('select').formSelect();
  });

let times = [1100, 1130, 1200, 1230, 1300, 1330];

$("#day").change(function(){
    $("#time").empty();
    $("#time").append("<option value='' disabled selected>Choose a time</option>");
    $("#time").removeAttr("disabled");

    var day = $("#day").val();

    times.forEach(function(time){
        $.post("/times", {"time": time, "day": day}, function(data){
            if(data.count == 0){
                $("#time").append("<option value="+time+">"+time+"</option>");
            }else{
                $("#time").append("<option disabled value="+time+">"+time+"</option>");
            }
            $('select').formSelect();
        })
    })
    
})