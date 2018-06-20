<?php

require_once(__DIR__ . '/../define.php');

try {
    $jcnf = file_get_contents(CNF_PATH);
    $cnf  = json_decode($jcnf);
    
    $jprm = file_get_contents('php://input');
    $prm  = json_decode($jprm);
    
    $cnf->api->key = $prm->key;
    $cnf->api->loc = $prm->loc;
    $ret  = file_put_contents(CNF_PATH, json_encode($cnf));
    
    echo json_encode(
        array('result' => true)
    );
} catch (Exception $e) {
    echo json_encode(
        array(
            'result'  => false,
            'message' => $e->getMessage()
        )
    );
}
