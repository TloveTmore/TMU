<?php
if (isset($_GET['admin']))
    header("Location: ../dashboard/login.html");
else
    header("Location: ../index.html");
// Đặt thời gian hết hạn của cookie là thời điểm trong quá khứ để xóa nó
setcookie("name", "", time() - 3600, "/");
setcookie("admin", "", time() - 3600, "/");
setcookie("user_id", "", time() - 3600, "/");
?>