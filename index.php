<?php


function toTr($date){
    $aylar = array(
        'January'    =>    'Ocak',
        'February'    =>    'Şubat',
        'March'        =>    'Mart',
        'April'        =>    'Nisan',
        'May'        =>    'Mayıs',
        'June'        =>    'Haziran',
        'July'        =>    'Temmuz',
        'August'    =>    'Ağustos',
        'September'    =>    'Eylül',
        'October'    =>    'Ekim',
        'November'    =>    'Kasım',
        'December'    =>    'Aralık',
        'Monday'    =>    'Pazartesi',
        'Tuesday'    =>    'Salı',
        'Wednesday'    =>    'Çarşamba',
        'Thursday'    =>    'Perşembe',
        'Friday'    =>    'Cuma',
        'Saturday'    =>    'Cumartesi',
        'Sunday'    =>    'Pazar',
        'Jan' => 'Ocak',
        'Feb' => 'Şubat',
        'Mar' => 'Mart',
        'Apr' => 'Nisan',
        'May' => 'Mayıs',
        'Jun' => 'Haziran',
        'Jul' => 'Temmuz',
        'Aug' => 'Ağustos',
        'Sep' => 'Eylül',
        'Oct' => 'Ekim',
        'Nov' => 'Kasım',
        'Dec' => 'Aralık'

    );
    return  strtr($date, $aylar);
}

$today = strtotime(date("Y-m-d"));
$day = date('D', $today);
$dayint = date('d', $today);
$month = date('m', $today);
$year = date('Y', $today);

$begin = new DateTime();
$end   = new DateTime();
$end->modify('+30 day');

$firstDayTime = strtotime(date("Y-m-1"));
$firstDay = date('D', $firstDayTime);

$total_date = cal_days_in_month(CAL_GREGORIAN, (int)date("m"), (int)date("Y"));


if($firstDay == "Sun"){
    $pass = 6;
}

else if($firstDay == "Sat"){
    $pass = 5;
}

else if($firstDay == "Fri"){
    $pass = 4;
}

else if($firstDay == "Thu"){
    $pass = 3;
}

else if($firstDay == "Wed"){
    $pass = 2;
}

else if($firstDay == "Tue"){
    $pass = 1;
}

else if($firstDay == "Mon"){
    $pass = 0;
}

$jsonDates = file_get_contents("dates.json");
$blabla = json_decode($jsonDates, true);

?>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>IKU Calendar</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="assets/css/main.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script async="" src="https://www.googletagmanager.com/gtag/js?id=G-JWXQ47WG9Z"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-JWXQ47WG9Z');
        </script>
    </head>
    <body>

        <div class="cal-panel">

            <div class="calendar">
                
                <h1 id="l"><</h1>
                <h2 id="head-date"><?php echo toTr(date('M', $today)); echo " "; echo date('Y', $today); ?></h2>
                <h1 id="r">></h1>
                <div class="names-of-days">
                    <p>Pazartesi</p>
                    <p>Salı</p>
                    <p>Çarşamba</p>
                    <p>Perşembe</p>
                    <p>Cuma</p>
                    <p>Cumartesi</p>
                    <p>Pazar</p>
                </div>

                <div class="names-of-days-mobile">
                    <p>Pzt</p>
                    <p>S</p>
                    <p>Çrş</p>
                    <p>Prş</p>
                    <p>C</p>
                    <p>Cmt</p>
                    <p>Pzr</p>
                </div>

                <?php 
                for($i = 0; $i < $pass; $i++){
                    echo '<div class="day">
                    </div>';
                }

                for($z = 1; $z <= $total_date; $z++){
                    $dt = "";
                    
                    $ddt = new DateTime('01-' . $month . '-' . $year );
                    $ddt->modify('+' . strval($z - 1) . ' day');
                    $m = toTr($ddt->format("M"));
                    $d = toTr($ddt->format("d"));
                    $y = $ddt->format("Y");
                    $pushStr = $d . " " . $m . " " . $y;

                    $eventDate = $pushStr;

                    foreach($blabla["data"] as $aaa){
                        if($aaa["date"] == $eventDate){
                            $dt = $dt . '.';
                        }
                    }

                    if($z == $dayint){
                        echo '<div class="day">
                        <p class="date-of-day selected">'. $z .'</p>
                        <p class="event-dots">'. $dt .'</p>
                    </div>';
                    }
                    else{
                        echo '<div class="day">
                        <p class="date-of-day">'. $z .'</p>
                        <p class="event-dots">'. $dt .'</p>
                    </div>';
                    }
                }
                ?>

                
            </div>

            <div class="events">
                <div class="bg-shadow">

                    <div class="panel">

                        <input type="text" id="search" placeholder="Etkinlikler içinde arayın">

                    </div>

                    
                    <?php

                    $av_dates = array();

                    for($i = $begin; $i <= $end; $i->modify('+1 day')){
                        $m = toTr($i->format("M"));
                        $d = toTr($i->format("d"));
                        $y = $i->format("Y");
                        $pushStr = $d . " " . $m . " " . $y;
                        array_push($av_dates, $pushStr);
                    }

                    foreach($blabla["data"] as $dateinfo){
                        $eventDate = $dateinfo["date"];
                        $eventHeader = $dateinfo["news"];

                        if(in_array($eventDate, $av_dates)){
                            echo '<div class="panel">

                            <h4>' . $eventHeader . '</h4>
    
                            <br>
                            <div class="date">
                                <p>' . $eventDate . '</p>
                            </div>
    
                        </div>';
                        }

                    }

                    ?>
                    

                </div>
            </div>

        </div>
        
    </body>

    <script src="assets/js/calender.js"></script>
    <script src="assets/js/changeMonth.js"></script>
    <script src="assets/js/changeDate.js"></script>
    <script src="assets/js/searchEvents.js"></script>
</html>