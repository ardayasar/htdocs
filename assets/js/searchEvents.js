$("#search").on("input", function(){
    $('.panel').each(function(){
        if($(this).find("input").attr("id") == 'search'){

        }
        else{
            $(this).remove();
        }
    })
    var search = $("#search").val();
    let activeList = [];
    if(search.length > 0){
        $.get('dates.json', function(data) {
            $dat = JSON.parse(data);
            $dat["data"].forEach(element => {
                if(element["news"].includes(search)){
                    $(".bg-shadow").append('<div class="panel">   <h4> ' + element["news"] + ' </h4><br><div class="date"><p> ' + element["date"] + ' </p></div></div>');
                }
            });
            //$(".calendar").append("<div class='day'><p class='date-of-day'>" + d + "</p><p class='event-dots'> "+ $f + "</p></div>");
        }, 'text');
    }
    else{

    }

})