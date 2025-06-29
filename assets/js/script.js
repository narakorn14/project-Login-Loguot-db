$(document).ready(function() {
    // --- Registration Handler ---
    $('#registerForm').on('submit', function(event) {
        event.preventDefault(); // ป้องกันการ refresh หน้าเว็บเมื่อ submit ฟอร์ม

        // Clear previous messages
        $('#message-area').html('');

        // Basic client-side validation (optional, server-side is crucial)
        let username = $('#username').val().trim();
        let email = $('#email').val().trim();
        let password = $('#password').val();
        let confirm_password = $('#confirm_password').val();

        if (!username || !email || !password || !confirm_password) {
            displayMessage('กรุณากรอกข้อมูลให้ครบทุกช่อง', 'danger');
            return;
        }

        if (password !== confirm_password) {
            displayMessage('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน', 'danger');
            return;
        }

        // Password strength (basic example, can be more complex)
        if (password.length < 8) {
            displayMessage('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร', 'danger');
            return;
        }

        // เตรียมข้อมูลที่จะส่ง
        let formData = {
            username: username,
            email: email,
            password: password,
            confirm_password: confirm_password // ส่ง confirm_password ไปให้ server ตรวจสอบอีกครั้งก็ได้
        };


        $.ajax({
            type: 'POST',
            url: `api/register.php`, // Endpoint ของ PHP script
            data: formData,
            dataType: 'json', // คาดหวังข้อมูลตอบกลับเป็น JSON
            success: function(response) {
                if (response.status === 'success') {
                    displayMessage(response.message, 'success');
                    $('#registerForm')[0].reset(); // ล้างข้อมูลในฟอร์ม
                    // อาจจะ redirect ไปหน้า login หลังจากลงทะเบียนสำเร็จ
                    // setTimeout(function() {
                    //    window.location.href = 'login.html';
                    // }, 2000); // Redirect after 2 seconds
                } else {
                    displayMessage(response.message, 'danger');
                }
            },
            error: function(xhr, status, error) {
                // Handle AJAX errors (e.g., server not reachable, 500 error)
                console.error("AJAX Error:", status, error, xhr.responseText);
                displayMessage('เกิดข้อผิดพลาดในการส่งข้อมูล: ' + error + '. โปรดตรวจสอบ Console.', 'danger');
            }
        });
    });

    // --- Login Handler ---
    $('#loginForm').on('submit', function(event) {
        event.preventDefault(); // ป้องกันการ submit ฟอร์มแบบปกติ

        $('#login-message-area').html(''); // Clear previous messages

        let username = $('#username').val().trim();
        let password = $('#password').val();

        if (!username || !password) {
            displayLoginMessage('กรุณากรอกชื่อผู้ใช้ และรหัสผ่าน', 'danger');
            return;
        }

        let formData = {
            username: username,
            password: password
        };

        console.log(formData)

        $.ajax({
            type: 'POST',
            url: 'api/login.php',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    displayLoginMessage(response.message, 'success');
                    // Redirect to dashboard or another page
                    if (response.redirect_url) {
                        setTimeout(function() {
                            window.location.href = response.redirect_url;
                        }, 1500); // Redirect after 1.5 seconds
                    }
                } else {
                    displayLoginMessage(response.message, 'danger');
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error:", status, error, xhr.responseText);
                displayLoginMessage('เกิดข้อผิดพลาดในการส่งข้อมูล: ' + error + '. โปรดตรวจสอบ Console.', 'danger');
            }
        });
    });

    // --- Logout Handler (เพิ่มใหม่) ---
    $('#logoutButton').on('click', function(event) {
        event.preventDefault(); // ป้องกัน behavior ปกติของปุ่ม (ถ้ามี)

        // อาจจะแสดง loading spinner ตรงนี้

        $.ajax({
            type: 'POST', // หรือ 'GET' ก็ได้สำหรับ logout ถ้าไม่มีการส่งข้อมูลที่ sensitive
            url: 'api/logout.php',
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    // แสดงข้อความสั้นๆ ก่อน redirect (optional)
                    // displayDashboardMessage('กำลังออกจากระบบ...', 'info');
                    // Redirect to login page
                    window.location.href = 'login.html';
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX Logout Error:", status, error, xhr.responseText);
                displayDashboardMessage('เกิดข้อผิดพลาดในการเชื่อมต่อเพื่อออกจากระบบ: ' + error, 'danger');
            }
        });
    });

    // Function to display messages in the message-area
    function displayMessage(message, type) {
        $('#message-area').html(
            `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
        );
    }

    // Function to display messages in the login message-area
    function displayLoginMessage(message, type) {
        $('#login-message-area').html( // ของ login
            `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
        );
    }
});