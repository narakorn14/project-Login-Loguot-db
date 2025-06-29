<?php
// Start session to check login status
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Check if the user is logged in, if not then redirect to login page
if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    header("location: login.html");
    exit;
}

// User is logged in, welcome them
$username = htmlspecialchars($_SESSION["username"]); // Sanitize output
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
</head>
<body>
<!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <a href="index.php" class="navbar-brand navbar-brand-custom">AuthSystem</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-labe="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="#navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a href="index.php" class="nav-link">Welcome, <?php echo $username; ?>!</a>
            </li>
            <li class="nav-item">
              <a class="btn btn-danger" id="logoutButton" >Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
<!-- End Navbar -->
<!-- Heros -->
    <div class="container mt-5">
        <div class="card bg-secondary-subtle" role="alert">
            <div class="card-body">
                <h4 class="alert-heading">Welcome, <?php echo $username; ?>!</h4>
                <p>This is your dashboard</p>
            </div>
        </div>
    </div>
<!-- End Heros -->
<!-- Footer -->

<!-- End Footer -->

  <script src="assets/js/bootstrap.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
  <script src="assets/js/script.js"></script>
</body>
</html>