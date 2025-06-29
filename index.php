<?php
// index.php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (isset($_SESSION["logged_in"]) && $_SESSION["logged_in"] === true) {
    header("location: dashboard.php");
    exit;
}
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
              <a href="index.php" class="nav-link">Home</a>
            </li>
            <li class="nav-item">
              <a href="login.html" class="nav-link">Sign In</a>
            </li>
            <li class="nav-item">
              <a href="register.html" class="btn btn-primary" role="button">Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
<!-- End Navbar -->
<!-- Heros -->
<div class="main-content">
  <div class="container">
    <div class="hero-section">
      <h1>Welcome to our website</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni labore quas eum excepturi necessitatibus cumque voluptas, debitis praesentium repudiandae maiores molestiae explicabo tempore similique architecto corrupti doloremque numquam eveniet enim delectus, dolor reiciendis provident dolorem. Reprehenderit tempore dicta, distinctio laborum sequi suscipit ut esse! Similique vero modi quae aperiam sapiente.</p>
      <div>
        <a href="login.html" class="btn btn-success btn-lg btn-custom">Sign In</a>
        <a href="register.html" class="btn btn-info btn-lg btn-custom">Create an account</a>
      </div>
    </div>
  </div>
</div>
<!-- End Heros -->
<!-- Footer -->
<footer class="footer mt-auto">
  <div class="container">
    <span>&copy; <?php echo date("Y"); ?> AuthSystem</span>
  </div>
</footer>
<!-- End Footer -->

  <script src="assets/js/bootstrap.min.js"></script>
</body>
</html>