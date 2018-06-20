<?php
namespace epd;
require_once(__DIR__ . '/ttr/class.php');

try {

    $uri  = "http://api.openweathermap.org/data/2.5/forecast?q=Tokyo,jp&APPID=605634874fe5c002c5cd7d873b829aa1";
    $rest = new \ttr\rest\RestSender($uri);
    $jret = $rest->sendGet();
    $pret = json_decode($jret);
    $wid  = $pret->list[0]->weather[0]->id);
} catch (\Exception $e) {
     echo $e->getMessage();
}
