<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db.php';

$allPizzas = mysqli_query($db_conn,"SELECT * FROM `pizza`");
if(mysqli_num_rows($allPizzas) > 0){
    $all_pizzas = mysqli_fetch_all($allPizzas);
    echo json_encode(["success"=>true,"pizzas"=>$all_pizzas]);
}
else{
    echo json_encode(["success"=>false]);
}