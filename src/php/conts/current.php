<?php
/**
 * @file cur.php
 * @brief get current contents of e-paper
 */
require_once(__DIR__ . '/../define.php');

try {
    
    //echo json_encode("test");
    
    $jcnf = file_get_contents(CNF_PATH);
    $cnf  = json_decode($jcnf);
    
    echo json_encode(
        array(
            'result'  => true,
            'message' => $cnf->epd->cur
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
