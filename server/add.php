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
    $image = $_FILES["image"]['name'];
    $description = $_POST["description"];
    $price = $_POST["price"];
   
    $sql = "INSERT INTO pizza (name, image, description, price) VALUES ('$name', '$image', '$description', '$price')";
    
    $result = mysqli_query($db_conn,$sql);
    $statusMsg = '';

    if($result) {
        move_uploaded_file($_FILES["image"]["tmp_name"], "upload/".$_FILES["image"]["name"]);
        
        $response = "Pizza Inserted Successfully";
        $status = true;
        echo json_encode(array(message => $response, status => $status));
    } else {
        $response = "Pizza Not Inserted";
        $status = false;
        echo json_encode(array(message => $response, status => $status));
        die(mysqli_error($db_conn));
    }
}

?>