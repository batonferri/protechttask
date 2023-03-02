<?php
session_start();
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
}

require_once 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

function doesUserExistByEmail($email)
{
    global $conn;
    $sqlQuery = "SELECT * FROM `users` WHERE `email`=:email";
    $statement = $conn->prepare($sqlQuery);
    $statement->bindParam(':email', $email);
    if ($statement->execute()) {
        $user = $statement->fetch(PDO::FETCH_ASSOC);
        return $user !== false;
    }
    return false;
}


function storeUserToDatabase($user)
{
    global $conn;
    $sqlQuery = "INSERT INTO `users`(`full_name`, `email`, `password`) VALUES(:full_name, :email, :password);";
    $encryptedPassword = md5($user->password);
    $statement = $conn->prepare($sqlQuery);
    $statement->bindParam(':full_name', $user->full_name);
    $statement->bindParam(':email', $user->email);
    $statement->bindParam(':password', $encryptedPassword);

    if ($statement->execute()) {
        return true;
    }
    return false;
}



function findUserByEmailAndPassword($email, $password)
{
    global $conn;

    $sqlQuery = "SELECT id, email, full_name FROM `users` WHERE `email`=:email
                     AND `password`=:password";
    $encryptedPassword = md5($password);
    $statement = $conn->prepare($sqlQuery);
    $statement->bindParam(":email", $email);
    $statement->bindParam(":password", $encryptedPassword);
    if ($statement->execute()) {
        $user = $statement->fetch(PDO::FETCH_ASSOC);
        if ($user !== false) {
            return $user;
        }
    }
    return null;
}



function getAllUserProduct($user_id)
{
    global $conn;
    $sqlQuery = "SELECT * FROM  `products` WHERE `user_id`=:user_id;";
    $statement = $conn->prepare($sqlQuery);
    $statement->bindParam(':user_id', $user_id);
    $statement->execute();
    $products = $statement->fetchAll(PDO::FETCH_ASSOC);
    return json_encode($products);
}


function storeProductToDatabase($product)
{
    global $conn;
    $sqlQuery = "INSERT INTO `products`(`product_name`, `price`, `user_id`) VALUES(:product_name, :price, :user_id);";
    $statement = $conn->prepare($sqlQuery);
    $statement->bindParam(':user_id', $product->user_id);
    $statement->bindParam(':product_name', $product->product_name);
    $statement->bindParam(':price', $product->price);

    if ($statement->execute()) {
        return true;
    }
    return false;

}

function updateProduct($product)
{
    global $conn;
    $sqlQuery = "UPDATE `products` SET `product_name`= :product_name, `price` =:price  WHERE `id` = :id AND `user_id`=:user_id;";
    $statement = $conn->prepare($sqlQuery);
    $statement->bindParam(':id', $product->id);
    $statement->bindParam(':user_id', $product->user_id);
    $statement->bindParam(':product_name', $product->product_name);
    $statement->bindParam(':price', $product->price);



    if ($statement->execute()) {
        return true;
    }
    return false;

}


function deleteProductById($id, $user_id)
{
    global $conn;
    $sqlQuery = "DELETE FROM `products` WHERE `id` = :id AND `user_id`=:user_id;";
    $statement = $conn->prepare($sqlQuery);
    $statement->bindParam(':id', $id);
    $statement->bindParam(':user_id', $user_id);
    if ($statement->execute()) {
        return true;
    }
    return false;

}



?>