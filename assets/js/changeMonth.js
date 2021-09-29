var  months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

// $.get('dates.json', function(dataa) {
//     data = JSON.parse(dataa);
// }, 'text');

// function enToTr(en){
//     en_days = ['Mon','Tue','Wed','Thu','Fri' ,'Sat','Sun'];
//     tr_days = ['Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi','Pazar'];
  
//     $findInEn = en_days.indexOf(en);
//     $translatedToTr = tr_days[$findInEn];
    
//     return $translatedToTr;
// }

function intToTr(en){
    tr_months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    return tr_months[en-1];
}

function eventsInDate(d,m,y){
    let day = controlDay = d + " " + intToTr(m) + " " + y;
    $.get('events.json', function(data) {
        $dat = JSON.parse(data);
        let j = 0;
        $dat.forEach(element => {
            if(element["date"] == day){
                j = element["event_count"];
            }
        });
        $f = "";
        if(j == 0){
            $f = "";
        }
        else
        if(j > 0){
            for(y = 0; y < j; y++){
                $f = $f + ".";
            }
        }
        $(".calendar").append("<div class='day'><p class='date-of-day'>" + d + "</p><p class='event-dots'> "+ $f + "</p></div>");
    }, 'text');
}

$("#l").click(function(){
    $(".day").remove();
    $previousText = $("#head-date").text();
    $previousMonth = $previousText.split(" ")[0];
    $previousYear = $previousText.split(" ")[1];

    if($previousMonth == "Ocak"){
        $selectedMonth = 11;
        $year = parseInt($previousYear) - 1;
    }
    else{
        $selectedMonth = months.indexOf($previousMonth) - 1;
        $year = $previousYear;
    }

    $changeHeader = months[$selectedMonth] + " " + $year;
    document.getElementById("head-date").innerHTML = $changeHeader;
    getDaysOfMonth($selectedMonth + 1, $year);
});

$("#r").click(function(){
    $(".day").remove();
    $previousText = $("#head-date").text();
    $previousMonth = $previousText.split(" ")[0];
    $previousYear = $previousText.split(" ")[1];

    if($previousMonth == "Aralık"){
        $selectedMonth = 0;
        $year = parseInt($previousYear) + 1;
    }
    else{
        $selectedMonth = months.indexOf($previousMonth) + 1;
        $year = $previousYear;
    }

    $changeHeader = months[$selectedMonth] + " " + $year;
    document.getElementById("head-date").innerHTML = $changeHeader;
    getDaysOfMonth($selectedMonth + 1, $year);
});

function getDaysOfMonth(month, year){

    $daysOfMonth = new Date(year, month, 0).getDate();
    $firstDayOfMonth = new Date(year, month-1, 1).toString();
    $firstDayOfMonth = $firstDayOfMonth.split(" ")[0];
    en_days = ['Mon','Tue','Wed','Thu','Fri' ,'Sat','Sun'];
    $pass = en_days.indexOf($firstDayOfMonth);
    for(var i = 0; i < $pass; i++){
        $(".calendar").append("<div class='day'></div>");
    }
    for(var i = 1; i < $daysOfMonth+1; i++){
        if(i < 10){
            $totalEvents = eventsInDate("0" + i, month, year);
            setTimeout(() => {
                console.log("ok");
            }, 50);
        }
        else{
            $totalEvents = eventsInDate(i, month, year);
            setTimeout(() => {
                console.log("ok");
            }, 50);
        }
    }
    // $.get('dates.json', function(data) {
    //     $dates_json = JSON.parse(data);
    //     $dates_json["data"].forEach(element => {
    //         for(var i = 0; i < $daysOfMonth; i++){
    //             $controlDay = i + " " + intToTr(month) + " " + year;
    //             $dates_json["data"].
    //             if($controlDay == element["date"]){
    //                 console.log("ok");
    //                 $(".calendar").append("<div class='day'><p class='date-of-day'>" + i + "</p><p class='event-dots'>'. $dt .'</p></div>");
    //             }       
    //         } 
    //     });
    // }, 'text');

}