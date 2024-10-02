<?php
include 'condb.php';

if (isset($_GET['user'])) {
    $name = $_POST["name"];
    $user_name = $_POST["user_name"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Tiến hành INSERT vào cơ sở dữ liệu
    $sql = "INSERT INTO user (`name`, email, user_name, `password`)
            VALUES ('$name', '$email', '$user_name', '$password')";

    $result = $conn->query("SELECT * FROM user WHERE user_name ='$user_name'");
    if ($result->num_rows > 0) {
        header("Location: ../sign-up.html?error=true");
        exit();
    }
    $location = "../sign-in.html?login=$user_name";
} elseif (isset($_GET['tour'])) {
    $title = $_POST['title'];
    $address = $_POST['address'];
    $datein = $_POST['datein'];
    $dateout = $_POST['dateout'];
    $img = $_POST['img'];
    $price = $_POST['price'];
    $city = $_POST['city'];
    $detail = $_POST['detail'];
    $trip = $_POST['title_trip']."|*".$_POST['stitle_trip'];
    // Tiến hành INSERT vào cơ sở dữ liệu
    $sql = "INSERT INTO `tour` (`title`, `address`, `datein`, `dateout`, `trip`, `img`, `price`, `city`, `detail`) 
            VALUES ('$title', '$address', '$datein', '$dateout', '$trip', '$img', '$price', '$city', '$detail')";

    $location = "../dashboard/tour.html";
} elseif (isset($_GET['category'])) {
    $name = $_POST["name"];

    // Tiến hành INSERT vào cơ sở dữ liệu
    $sql = "INSERT INTO category (`name`)
            VALUES ('$name')";

    $location = "../dashboard/index.html";
} elseif (isset($_GET['booking'])) {
    $tour_id = $_GET['booking'];
    $c_name = $_POST['c_name'];
    $c_email = $_POST['c_email'];
    $c_phone = $_POST['c_phone'];
    $quantity = $_POST['quantity'];

    // Tiến hành INSERT vào cơ sở dữ liệu
    $sql = "INSERT INTO `booking` (`c_name`, `c_email`, `c_phone`, `quantity`, `tour_id`) 
            VALUES ('$c_name', '$c_email', '$c_phone', '$quantity', '$tour_id')";
    
    $conn->query($sql);

    // Tạo mảng chứa các biến đã nhập
    $data = array(
        'tour_id' => $tour_id,
        'c_name' => $c_name,
        'c_email' => $c_email,
        'c_phone' => $c_phone,
        'quantity' => $quantity
    );

    // Trả về mảng dưới dạng JSON
    header('Content-Type: application/json');
    echo json_encode($data);

    exit();
}


// Thực hiện câu lệnh INSERT
if ($conn->query($sql) === TRUE) {
    header("Location: " . $location);
} else {
    echo "Lỗi khi thêm dữ liệu: " . $conn->error;
}

// Đóng kết nối
$conn->close();
