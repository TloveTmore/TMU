//Kết nối cơ sở dữ liệu bằng PDO
<?php
$host = 'localhost';  // Địa chỉ máy chủ
$db = 'ten_cua_database';  // Tên cơ sở dữ liệu
$user = 'ten_nguoi_dung';  // Tên người dùng
$pass = 'mat_khau';  // Mật khẩu
$dsn = "sqlsrv:Server=$host;Database=$db";  // Sử dụng DSN cho SQL Server (với MySQL: "mysql:host=$host;dbname=$db;charset=utf8")

try {
    $pdo = new PDO($dsn, $user, $pass);
    // Thiết lập chế độ lỗi PDO để nhận thông báo lỗi
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Kết nối thành công!";
} catch (PDOException $e) {
    echo "Lỗi kết nối: " . $e->getMessage();
}
?>

//Thêm dữ liệu vào bảng my_contacts
<?php
try {
    // Chuẩn bị câu lệnh SQL
    $sql = "INSERT INTO my_contacts (full_names, gender, contact_no, email, city, country)
            VALUES (:full_names, :gender, :contact_no, :email, :city, :country)";

    // Chuẩn bị câu truy vấn
    $stmt = $pdo->prepare($sql);

    // Gán giá trị vào các tham số
    $stmt->bindParam(':full_names', $full_names);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':contact_no', $contact_no);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':city', $city);
    $stmt->bindParam(':country', $country);

    // Dữ liệu mẫu
    $full_names = 'Poseidon';
    $gender = 'Male';
    $contact_no = '555';
    $email = 'poseidon@olympus.mt.co';
    $city = 'Atlantis';
    $country = 'Greece';

    // Thực thi câu truy vấn
    $stmt->execute();
    echo "Thêm dữ liệu thành công!";
} catch (PDOException $e) {
    echo "Lỗi thêm dữ liệu: " . $e->getMessage();
}
?>

//Cập nhật dữ liệu trong bảng my_contacts
<?php
try {
    // Chuẩn bị câu lệnh SQL
    $sql = "INSERT INTO my_contacts (full_names, gender, contact_no, email, city, country)
            VALUES (:full_names, :gender, :contact_no, :email, :city, :country)";

    // Chuẩn bị câu truy vấn
    $stmt = $pdo->prepare($sql);

    // Gán giá trị vào các tham số
    $stmt->bindParam(':full_names', $full_names);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':contact_no', $contact_no);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':city', $city);
    $stmt->bindParam(':country', $country);

    // Dữ liệu mẫu
    $full_names = 'Poseidon';
    $gender = 'Male';
    $contact_no = '555';
    $email = 'poseidon@olympus.mt.co';
    $city = 'Atlantis';
    $country = 'Greece';

    // Thực thi câu truy vấn
    $stmt->execute();
    echo "Thêm dữ liệu thành công!";
} catch (PDOException $e) {
    echo "Lỗi thêm dữ liệu: " . $e->getMessage();
}
?>

//Xoá dữ liệu từ bảng my_contacts
<?php
try {
    // Câu lệnh SQL xóa
    $sql = "DELETE FROM my_contacts WHERE id = :id";

    // Chuẩn bị câu truy vấn
    $stmt = $pdo->prepare($sql);

    // Gán giá trị vào tham số
    $stmt->bindParam(':id', $id);

    // Dữ liệu cần xóa
    $id = 5;  // ID của Poseidon (giả sử đã thêm trước đó)

    // Thực thi câu truy vấn
    $stmt->execute();
    echo "Xóa dữ liệu thành công!";
} catch (PDOException $e) {
    echo "Lỗi xóa dữ liệu: " . $e->getMessage();
}
?>
