<?php

require_once(__DIR__ . '/../define.php');

try {
    //$jprm = file_get_contents('php://input');
    $jcnf = file_get_contents(CNF_PATH);
    $cnf  = json_decode($jcnf);
    
    echo json_encode(
        array(
            'result'  => true,
            'message' => $cnf->api
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
