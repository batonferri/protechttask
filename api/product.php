<?php
require_once 'util.php';


switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        $path = explode('=', $_SERVER['REQUEST_URI']);
        echo getAllUserProduct($path[1]);
        break;
    case "POST":
        $product = json_decode(file_get_contents('php://input'));
        if (storeProductToDatabase($product)) {
            echo "Product created successfully";
            die();
        }
        echo "Product couldn't been stored please try again";
        throw new Exception(`Product couldn't been stored please try again`);
    case "PUT":
        $product = json_decode(file_get_contents('php://input'));
        if (updateProduct($product)) {
            echo "Product updated successfully";
            die();
        }
        echo "Product couldn't been updated please try again";
        throw new Exception(`Product couldn't been updated please try again`);
    case "DELETE":
        $product = json_decode(file_get_contents('php://input'));
        if (deleteProductById($product->id, $product->user_id)) {
            echo "Product deleted successfully";
            die();
        }
        echo "Product couldn't been deleted please try again";
        throw new Exception(`Product couldn't been deleted please try again`);
}
?>