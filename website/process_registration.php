<?php
header('Content-Type: text/html; charset=utf-8');

$firstName = htmlspecialchars(trim($_POST['firstName'] ?? ''));
$lastName = htmlspecialchars(trim($_POST['lastName'] ?? ''));
$email = htmlspecialchars(trim($_POST['email'] ?? ''));
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';
$phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
$birthdate = htmlspecialchars(trim($_POST['birthdate'] ?? ''));
$gender = htmlspecialchars(trim($_POST['gender'] ?? ''));
$terms = isset($_POST['terms']) ? 'Đã đồng ý' : 'Chưa đồng ý';
$age = '';

?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kết quả đăng ký</title>
    <link rel="stylesheet" href="registration.css">
    <link rel="stylesheet" href="results.css">
</head>

<body style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
    <div class="result-container">
        <h2>Kết quả đăng ký</h2>

        <?php if (!empty($errors)): ?>
            <div class="error-section">
                <h3>Có lỗi xảy ra:</h3>
                <ul>
                    <?php foreach ($errors as $error): ?>
                        <li><?php echo $error; ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php else: ?>
            <div class="success-section">
                <h3>Đăng ký thành công!</h3>
                <p>Chào mừng <strong><?php echo $firstName . ' ' . $lastName; ?></strong> đến với hệ thống!</p>
            </div>

            <h3>Thông tin đã đăng ký:</h3>
            <table class="data-table">
                <tr>
                    <th>Họ & Đệm</th>
                    <td><?php echo $firstName; ?></td>
                </tr>
                <tr>
                    <th>Tên</th>
                    <td><?php echo $lastName; ?></td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td><?php echo $email; ?></td>
                </tr>
                <tr>
                    <th>Số điện thoại</th>
                    <td><?php echo $phone ?: 'Không cung cấp'; ?></td>
                </tr>
                <tr>
                    <th>Ngày sinh</th>
                    <td><?php echo $birthdate . ($age ? ' (Tuổi: ' . $age . ')' : ''); ?></td>
                </tr>
                <tr>
                    <th>Giới tính</th>
                    <td><?php
                        $genderLabels = [
                            'male' => 'Nam',
                            'female' => 'Nữ',
                            'other' => 'Khác'
                        ];
                        echo $genderLabels[$gender] ?? $gender;
                        ?></td>
                </tr>
                <tr>
                    <th>Điều khoản</th>
                    <td><?php echo $terms; ?></td>
                </tr>
                <tr>
                    <th>Thời gian đăng ký</th>
                    <td><?php echo date('d/m/Y H:i:s'); ?></td>
                </tr>
            </table>

            <p><small><em>Thông tin đã được lưu vào hệ thống lúc <?php echo date('d/m/Y H:i:s'); ?></em></small></p>
        <?php endif; ?>

        <a href="registration.html" class="back-btn">← Quay lại form đăng ký</a>
    </div>
</body>

</html>