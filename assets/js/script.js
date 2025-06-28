$(document).ready(function() {
    // --- Registration Handler ---
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();

        $('#message-area').html('');

        let username = $('#username').val().trim();
        let email = $('#email').val().trim();
        let password = $('#password').val();
        let confirm_password = $('#confirm_password').val();

        if (!username || !email || !password || !confirm_password) {
            displayMessage('Please enter all the input fields!!', 'danger');
            return;
        }

        if (password !== confirm_password) {
            displayMessage('Password and confirm password do not match!!', 'danger');
            return;
        }

        if (password.length < 8) {
            displayMessage('Password must be at least 8 characters long!!', 'danger');
            return;
        }

        let formData = {
            username,
            email,
            password,
            confirm_password
        }

        // console.log(formData);

        $.ajax({
            type: 'POST',
            url: 'api/register.php',
            data: formData,
            datatype: 'json',
            success(response){
                if (response.status === 'success') {
                    displayMessage(response.message, 'success');
                    $('#registerForm')[0].reset();
                } else {
                    displayMessage(response.message, 'danger');
                }
            },
            error(xhr, status, error) {
                console.error('AJAX Error:', status, error, xhr.responseText);
                displayMessage('An error occured while sending data: ' + error + 'please check your console', 'danger');                
            }
        })
    })
    // --- Login Handler ---
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        $('#login-message-area').html('');

        let username = $('#username').val().trim();
        let password = $('#password').val();

        if (!username || !password) {
            displayLoginMessage('Please enter your username and password', 'danger');
            return;
        }

        let formData = {
            tpye: 'POST',
            url: 'api/login.php',
            data: formData,
            dataType: 'json',
            success(response) {
                if (Response.status === 'success') {
                    displayLoginMessage(response.message, 'success');
                    if (response.redirect_url) {
                        setTimeout(function() {
                            window.location.href = response.redirect_url;    
                        }, 1500);
                    }
                } else {
                    displayLoginMessage(response.message, 'danger');
                }
            },
            error(xhr, status, success) {
                console.error('AJAX error ', status, error. xhr.responseText);
                displayLoginMessage('An error occurred white sending data', error, 'danger');
            }
        }

    })

    // Function to display message in the message-area
    function displayMessage(message, type) {
        $('#message-area').html(
            // alt * 96
            `<div class='alert alert-${type} alert-dismissible fade show' role='alert'>
            ${message}
            <button tpye='button' class='btn-close' data-bs-dismiss='alert' aria-lable='Close'></button>
            </div>`
        )
    }

    // Function to display message in the login message-area
    function displayLoginMessage(message, type) {
        $('#login-message-area').html(
            // alt * 96
            `<div class='alert alert-${type} alert-dismissible fade show' role='alert'>
            ${message}
            <button tpye='button' class='btn-close' data-bs-dismiss='alert' aria-lable='Close'></button>
            </div>`
        )
    }

})