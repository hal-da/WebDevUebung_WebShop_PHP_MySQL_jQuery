<?php
class View
{
    public function __construct()
    {
        header('Content-Type: application/json');
    }

    public function sendJsonView($data){
        $jsonOutput = json_encode($data);
        echo$jsonOutput;
    }

    public function sendError($error){
        $errorOutput= new stdClass();
        $errorOutput->error = $error;
        echo json_encode($errorOutput);
    }
    public function sendState($state){
        $output = new  stdClass();
        $output->state = $state;
        echo json_encode($output);
    }


}