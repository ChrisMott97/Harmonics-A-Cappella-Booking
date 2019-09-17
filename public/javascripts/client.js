$(document).ready(function(){
    $('select').formSelect();
  });

let times = [];

for (let i = 900; i < 2000; i=i+100) {
    for(let j = i; j<i+60; j=j+15){
      times.push(j);
    }
  }

$("#day").change(function(){
    $("#time").empty();
    $("#time").append("<option value='' disabled selected>Choose a time</option>");
    $("#time").removeAttr("disabled");

    var day = $("#day").val();

    $.post("/times", {"day": day}, function(data){
        for (let i = 0; i < times.length; i++) {
            const time = times[i];
            var exists = false;
            for (let j = 0; j < data.freshers.length; j++) {
                const fresher = data.freshers[j];
                if(fresher.time == time){
                    exists = true;
                    break;
                }
            }
            if(!exists){
                $("#time").append("<option value="+time+">"+time+"</option>");
            }
        }
        $('select').formSelect();
    })
    // times.forEach(function(time){
        // $.post("/times", {"time": time, "day": day}, function(data){
        //     if(data.count == 0){
        //         $("#time").append("<option value="+time+">"+time+"</option>");
        //     }else{
        //         // $("#time").append("<option disabled value="+time+">"+time+"</option>");
        //     }
        //     $('select').formSelect();
        // })
    // })
    
})
var day;
var time;

$(".data").click(function(){
    var email = $(this).text()
    day = $(this).attr('class').split(/\s+/)[1];
    time = $(this).attr('class').split(/\s+/)[2];
    time = time.substring(1, time.length);

    if(email){
        $("#email").text(email);
        $.get("/fresher/"+email, function(data){
            $("#fullName").text(data.firstName + " " + data.lastName);
        })
        $("#remove").removeAttr("disabled");
    }else{
        $("#fullName").text("Remove this slot from auditions!")
        $("#email").text("");
        $("#remove").removeAttr("disabled");
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
    }else{
        $.post("/empty", {day:day, time:time}, function(data){
            location.reload();
        })
    }
})