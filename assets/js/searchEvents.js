$("#search").on("input", function(){
    $('.panel').each(function(){
        if($(this).find("input").attr("id") == 'search'){

        }
        else{
            $(this).remove();
        }
    })
    var search = $("#search").val();
    if(search.length > 0){
        $.get('dates.json', function(data) {
            $dat = JSON.parse(data);
            $dat["data"].forEach(element => {
                if(element["news"].includes(search) || element["news"].includes(search.toUpperCase()) || element["news"].includes(search.toLowerCase())){
                    $(".bg-shadow").append('<div class="panel">   <h4> ' + element["news"] + ' </h4><br><div class="date"><p> ' + element["date"] + ' </p></div></div>');
                }
            });
        }, 'text');
    }
    else{
        
    }

})
