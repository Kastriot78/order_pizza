<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require 'db.php';
    // Check existence of id parameter before processing further
    if(isset($_GET["id"]) && !empty(trim($_GET["id"]))){
        $id = $_GET["id"];
        $sql = "SELECT * from pizza".($id?" where id=$id":''); 

        $result = mysqli_query($db_conn,$sql);

        if($result->num_rows == 1) {  
           $res = mysqli_fetch_array($result);
  
            echo json_encode($res);
        } else {
            echo json_encode(["success"=>false, "msg"=>"Piiza Not Found!"]);
        }
    } else {
        echo json_encode(["success"=>false, "msg"=>"Id is required!"]);
    }
?>
