<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tour_booking";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
?>

