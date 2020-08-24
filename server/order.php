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
    $lastname = $_POST["lastname"];
    $address = $_POST["address"];
    $phone = $_POST["phone"];
   
    $sql = "INSERT INTO orders (name, lastname, address, phone) VALUES ('$name', '$lastname', '$address', '$phone')";

    $result = mysqli_query($db_conn,$sql);

    if($result) {
        $id = mysqli_insert_id($db_conn);
        $response = "Order Inserted Successfully";
        $status = true;
        echo json_encode(array(message => $response, status => $status, id => $id));
    } else {
        $response = "Order Not Inserted";
        $status = false;
        echo json_encode(array(message => $response, status => $status));
        die(mysqli_error($db_conn));
    }
}

?>