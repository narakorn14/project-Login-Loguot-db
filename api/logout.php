<?php
header('Content-Type: application/json');

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$response = ['status' => 'error', 'message' => 'Logout failed.'];

// Unset all of the session variables
$_SESSION = array();

// Destroy the session.
if (session_destroy()) {
    $response['status'] = 'success';
    $response['message'] = 'Logged out successfully.';
} else {
    // It's rare for session_destroy to fail if session was active
    $response['message'] = 'Failed to destroy the session.';
}

echo json_encode($response);
exit;
?>