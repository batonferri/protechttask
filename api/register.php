<?php
require_once 'util.php';


if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo ("This endpoint doesn't support " . $_SERVER['REQUEST_METHOD'] . " method");
    die();
}

$user = json_decode(file_get_contents('php://input'));


if (strlen($user->full_name) < 3) {
    echo "Full name can't be shorter than 3";
    throw new Exception("Full name can't be shorter than 3");
}
if (!filter_var($user->email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email format";
    throw new Exception("Invalid email format");
}
if (strlen($user->password) < 8) {
    echo "password has to be 8 or more characters";
    throw new Exception('password has to be 8 or more characters');
}
if (doesUserExistByEmail($user->email)) {
    echo "This user already exists!";
    throw new Exception('This user already exists!');
}
if (storeUserToDatabase($user)) {
    echo "User created successfully";
    die();
}
throw new Exception('Please try again!');

?>