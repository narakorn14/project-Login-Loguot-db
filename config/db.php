<?php

define('DB_HOST', 'localhost');
define('DB_NAME', 'auth_system');
define('DB_USER', 'root');
define('DB_PASS', '');

$dsn = "mysql:host=" .DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";

// PDO Option
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Throw exceptions on error
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //fetch resulte as association arrays
    PDO::ATTR_EMULATE_PREPARES => false, //Disable emulation of prepared statement
];

try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch(PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode([
        'stastus' => 'error',
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit;
}

?>