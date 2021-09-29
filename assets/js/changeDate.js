$(document).on("click", ".date-of-day", function(){
    $('.panel').each(function(){
        if($(this).find("input").attr("id") == 'search'){

        }
        else{
            $(this).remove();
        }
    })
    /////////////////////////
    //get next 30 days here//
    /////////////////////////
    var head = $("#head-date").text();
    var date = $(this).text();
    var month = head.split(" ")[0];
    var year = head.split(" ")[1];
    if(date.length == 1){
        date = "0" + date;
    }
    var selected_day = date + " " + month + " " + year;
    $.get('dates.json', function(json) {
        let data = JSON.parse(json);
        data["data"].forEach(element => {
            $('.panel').each(function(){
                if($(this).find("h4").text() == element["news"] && $(this).find(".date > p").text() == element["date"]){
                    $(this).remove();
                }
            });
            if(selected_day == element["date"]){
                $(".bg-shadow").append('<div class="panel" id="button_select">   <h4> ' + element["news"] + ' </h4><br><div class="date"><p> ' + element["date"] + ' </p></div></div>');
            }
        });
        
    }, 'text');
});