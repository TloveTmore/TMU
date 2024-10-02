<?php
include 'condb.php';

if (isset($_GET['table'])) {
    $table = $_GET['table'];
    $id = $_GET['id'];
    $sql = "DELETE FROM $table WHERE id = $id";

    $location=$_GET['href'];
} 

if ($conn->query($sql) === TRUE) {
    header("Location: " . $location);
} else {
    echo "Lỗi khi cập nhật dữ liệu: " . $conn->error;
}

// Đóng kết nối
$conn->close();
?>
