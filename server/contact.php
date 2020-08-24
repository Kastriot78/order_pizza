<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require "db.php";

// POST DATA

$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
   
    $sql = "INSERT INTO contacts (name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";
    
    $result = mysqli_query($db_conn,$sql);
    $statusMsg = '';

    if($result) { 
        $status = true;
        echo json_encode(array(status => $status));
    } else {
        $status = false;
        echo json_encode(array(status => $status));
        die(mysqli_error($db_conn));
    }
}

?>