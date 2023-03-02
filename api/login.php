<?php
require_once 'util.php';

if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo ("This endpoint doesn't support " . $_SERVER['REQUEST_METHOD'] . " method");
    die();
}

$user = json_decode(file_get_contents('php://input'));

$userFounded = findUserByEmailAndPassword($user->email, $user->password);
if ($userFounded == null) {
    echo "Wrong credentials!!!";
    throw new Exception("Wrong credentials!!!");
}

$res = [
    'success' => 1,
    'message' => 'You have successfully logged in.',
    'userInfo' => $userFounded
];



echo json_encode($res)
    ?>