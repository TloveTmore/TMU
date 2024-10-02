<?php
// Kết nối tới cơ sở dữ liệu
include 'condb.php';

// Lấy thông tin từ biểu mẫu đăng nhập
$user_name = $_POST['user_name'];
$password = $_POST['password'];

if (isset($_GET['admin'])){
    if ($user_name=="admin" && $password=="admin"){
        setcookie("admin", "true", time() + 3600, "/"); 
        header("Location: ../dashboard/tour.html");
    } else {
        header("Location: ../dashboard/login.html?error=true");
    }
} else {
    // Kiểm tra thông tin đăng nhập trong cơ sở dữ liệu
    $sql = "SELECT * FROM user WHERE `user_name` = '$user_name' AND `password` = '$password'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        // Lấy thông tin hàng đầu tiên từ kết quả truy vấn
        $row = $result->fetch_assoc();
        $name = $row["name"]; // Lấy giá trị cột "name" từ hàng dữ liệu
        $id = $row["id"]; // Lấy giá trị cột "name" từ hàng dữ liệu
        
        // Đăng nhập thành công, thiết lập cookie với tên dựa trên "name"
        setcookie("name", $name, time() + 3600, "/"); // Cookie tồn tại trong 1 giờ
        setcookie("user_id", $id, time() + 3600, "/"); // Cookie tồn tại trong 1 giờ
        header("Location: ../index.html"); // Chuyển hướng đến trang index.php
    } else {
        header("Location: ../sign-in.html?error=true");
    }
    $conn->close();
}
?>
