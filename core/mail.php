<?php
//print_r($_POST);
//echo "ok";
//читать json файл
//$json = file_get_contents('../goods.json');
function connect(){
  $conn = mysqli_connect("localhost", "ondrui_eshop", "Admin111@", "ondrui_eshop");
  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }
  mysqli_set_charset($conn, "utf8");
  return $conn;
}

$conn = connect();
$sql = "SELECT * FROM goods";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
  $json = array();
  while($row = mysqli_fetch_assoc($result)) {
    $json[$row["id"]] = $row;
  }
}

//print_r ($json);
//письмо
$message = '';
$message .= '<h1>Заказ в магазине</h1>';
$message .= '<p>Телефон: '.$_POST['ephone'].'</p>';
$message .= '<p>Почта: '.$_POST['email'].'</p>';
$message .= '<p>Клиент: '.$_POST['ename'].'</p>';

$cart = $_POST['cart'];
$sum = 0;
foreach ($cart as $id=>$count) {
  $message .= $json[$id]['name'].' --- ';
  $message .= $count.' --- ';
  $message .= $count*$json[$id]['cost'];
  $message .= '<br>';
  $sum = $sum + $count*$json[$id]['cost'];
}
$message .= 'Всего: '.$sum;
//print_r($message);
$to = 'ondrui@yandex.ru'.','; //почта кто собирает заказ
$to .= $_POST['email'];
$spectext = '<!DOCTYPE HTML><html><head><title>Заказ</title></head><body>';
$headers = 'MIME-version: 1.0'. "\r\n";
$headers .= 'Content-Type: text/html; charset=utf-8'. "\r\n";

$m = mail($to, 'Заказ в магазине', $spectext.$message.'</body></html>', $headers);
if ($m) {
  echo 1;
} else {
  echo 2;
}
?>