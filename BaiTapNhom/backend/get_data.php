<?php
include 'condb.php';

// Lấy dữ liệu từ bảng bất kỳ
if (isset($_GET['table'])) {
    $table = $_GET['table'];
    $sql = "SELECT * FROM $table";

    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql = "SELECT * FROM $table WHERE id=$id";
    }

    if ($_GET['table']=='booking_info') {
        $sql = "SELECT booking.*, tour.title, tour.img
        FROM booking 
        INNER JOIN tour ON booking.tour_id=tour.id";
    }

    if ($_GET['table']=='city') {
        $sql = "SELECT *
        FROM tour 
        GROUP BY city";
    }
}

$result = $conn->query($sql);
$data = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data = [];
}

// Trả về dữ liệu dưới dạng JSON
header('Content-Type: application/json');
echo json_encode($data);

// Đóng kết nối đến cơ sở dữ liệu
$result->close();
