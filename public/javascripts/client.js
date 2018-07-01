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

$(".data").click(function(){
    var email = $(this).text()

    if(email){
        $("#email").text(email);
        $.get("/fresher/"+email, function(data){
            $("#fullName").text(data.firstName + " " + data.lastName);
        })
        $("#remove").removeAttr("disabled");
    }else{
        $("#fullName").text("Click an auditionee to know more!")
        $("#email").text("");
        $("#remove").attr("disabled", true);
    }
})

$("#remove").click(function(){
    var email = $("#email").text();
    if(email){
        $.post("/fresher/"+email, function(data){
            if(data){
                location.reload();
            }
        })
    }
})