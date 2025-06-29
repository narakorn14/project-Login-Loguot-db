<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json');
require_once '../config/db.php';

$respnose = ['status' => 'error', 'message' => 'An unexpected error occurred'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $respnose['message'] = 'Please enter your username and password';
        echo json_encode($respnose);
        exit;
    }

    try {
        // Check if is username
        $sql = "SELECT id, username, password FROM users WHERE username = :username";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Verify password
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['logged_in'] = true;

                $respnose['status'] = 'success';
                $respnose['message'] = 'Login Successful!! Redirecting to dashboard...';
                $respnose ['redirect_url'] = 'dashboard.php';
            } else {
                $respnose['message'] = 'Invalid username or password';
            }
        } else {
            $respnose['message'] = 'Invalid username or password';
        }

    } catch(PDOException $e) {
        $respnose['message'] = 'Server error occured ' . $e->getMessage();
    }
} else {
    $respnose['message'] = 'Invalid request method!!!';
}

echo json_encode($respnose);
exit;

?>