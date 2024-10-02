<?php
include 'condb.php';

if (isset($_GET['booking_active'])) {
    // Lấy dữ liệu từ biểu mẫu
    $id = $_GET['booking_active'];

    // Câu lệnh SQL UPDATE
    $sql = "UPDATE booking SET 
    `status` = 1
    WHERE id = $id";

    $location = "../dashboard/booking.html";
} elseif (isset($_GET['tour'])) {
    // Lấy các giá trị từ $_POST
    $id = $_GET['tour'];
    $title = $_POST['title'];
    $address = $_POST['address'];
    $datein = $_POST['datein'];
    $dateout = $_POST['dateout'];
    $img = $_POST['img'];
    $price = $_POST['price'];
    $city = $_POST['city'];
    $detail = $_POST['detail'];
    $trip = $_POST['title_trip'] . "|*" . $_POST['stitle_trip'];

    // Tiến hành UPDATE dữ liệu trong cơ sở dữ liệu
    $sql = "UPDATE `tour` 
        SET 
            `title` = '$title',
            `address` = '$address',
            `datein` = '$datein',
            `dateout` = '$dateout',
            `trip` = '$trip',
            `img` = '$img',
            `price` = '$price',
            `city` = '$city',
            `detail` = '$detail'
        WHERE 
            `id` = '$id'";

    $location = "../dashboard/tour.html";
}

if ($conn->query($sql) === TRUE) {
    header("Location: " . $location);
} else {
    echo "Lỗi khi cập nhật dữ liệu: " . $conn->error;
}

// Đóng kết nối
$conn->close();
