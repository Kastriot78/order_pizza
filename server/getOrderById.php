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
        $sql = "SELECT * from orders".($id?" where id=$id":''); 

        $result = mysqli_query($db_conn,$sql);

        if($result->num_rows == 1) {  
            foreach($result as $row)
            {
                $data['id'] = $row['id'];
                $data['name'] = $row['name'];
                $data['lastname'] = $row['lastname'];
                $data['address'] = $row['address'];
                $data['phone'] = $row['phone'];
            }
  
            echo json_encode($data);
        } else {
            echo json_encode(["success"=>false, "msg"=>"Order Not Found!"]);
        }
    } else {
        echo json_encode(["success"=>false, "msg"=>"Id is required!"]);
    }
?>