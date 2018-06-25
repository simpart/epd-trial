<?php
/**
 * @file update.php
 * @brief update contents of e-paper
 */
require_once(__DIR__ . '/../ttr/class.php');
require_once(__DIR__ . '/../define.php');


try {
    $jcnf = file_get_contents(CNF_PATH);
    $cnf  = json_decode($jcnf);
    
    if (0 === strcmp("", $cnf->api->key)) {
        throw new Exception('api key is null');
    }

    /* get weather info */
    $uri  = API_URI . "?q=" .  $cnf->api->loc . "&APPID=" . $cnf->api->key;
    $rest = new \ttr\rest\RestSender($uri);
    $jret = $rest->sendGet();
    $pret = json_decode($jret);
    if (200 != $pret->cod) {
        throw new Exception($pret->message);
    }
    
    $wid[] = $pret->list[0]->weather[0]->id;
    $wid[] = $pret->list[1]->weather[0]->id;
    $wid[] = $pret->list[2]->weather[0]->id;
    $wid[] = $pret->list[4]->weather[0]->id;
    
    $res_id = 801;
    foreach ($wid as $elm) {
        if ($res_id > $elm) {
            $res_id = $elm;
        }
    }
    
    $res_str = null;
    if (8 === ($res_id / 100)) {
        $res_str = "sun";
    } else if (7 === ($res_id / 100)) {
        $res_str = "rain";
    } else if (6 === ($res_id / 100)) {
        $res_str = "sun";
    } else if (5 === ($res_id / 100)) {
        $res_str = "rain";
    } else {
        $res_str = "cloud";
    }
    
    /* update current weather config */
    $cnf->epd->cur = $res_str;
    file_put_contents(CNF_PATH, json_encode($cnf));
    
    
    /* update e-paper display */
    $type    = intval($_POST["type"]);
    $img_pth = "/img/";
    if (EPD_TYPE_1 === $type) {
        $img_pth .= "p027b/";
    } else if (EPD_TYPE_2 === $type) {
        $img_pth .= "w042/";
    } else if (EPD_TYPE_3 === $type) {
        $img_pth .= "w042r/";
    }
    $img_pth .= $res_str . ".bmp";
# var_dump("sudo python " . __DIR__ . "/../../py/display.py " . __DIR__ . "/../../.." . $img_pth);
    system("sudo python " . __DIR__ . "/../../py/display.py " . __DIR__ . "/../../.." . $img_pth);
    
    echo json_encode(
        array(
            'result'  => true,
            'message' => $res_str
        )
    );
    
} catch (Exception $e) {
    echo json_encode(
        array(
            'result'  => false,
            'message' => $e->getMessage()
        )
    );
}
