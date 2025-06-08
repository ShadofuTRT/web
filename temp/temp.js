document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const birthdate = document.getElementById('birthdate').value;
        const gender = document.getElementById('gender').value;
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!firstName || firstName.length < 2 || !/^[a-zA-ZÀ-ỹĂăÂâÊêÔôƠơƯưĐđ\s]+$/.test(firstName)) {
            alert('Tên không hợp lệ.');
            return;
        }
        
        if (!lastName || lastName.length < 2 || !/^[a-zA-ZÀ-ỹĂăÂâÊêÔôƠơƯưĐđ\s]+$/.test(lastName)) {
            alert('Họ không hợp lệ.');
            return;
        }
        
        if (!birthdate) {
            alert('Vui lòng chọn ngày sinh.');
            return;
        }
        
        if (new Date(birthdate) > new Date()) {
            alert('Ngày sinh không thể là tương lai.');
            return;
        }
        
        if (!gender) {
            alert('Vui lòng chọn giới tính.');
            return;
        }
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Email không hợp lệ.');
            return;
        }
        
        if (!phone || !/^[0-9]{10,11}$/.test(phone.replace(/[-\s().]/g, ''))) {
            alert('Số điện thoại không hợp lệ.');
            return;
        }
        
        if (!username || username.length < 2) {
            alert('Tên đăng nhập không hợp lệ.');
            return;
        }
        
        if (!password || password.length < 8) {
            alert('Mật khẩu phải có ít nhất 8 ký tự.');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp.');
            return;
        }
        
        alert('Đăng ký thành công! Tất cả thông tin đều hợp lệ.');
    });
});