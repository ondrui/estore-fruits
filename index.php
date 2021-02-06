<?php
$route = $_GET['route'];
$title="eshop111";
require 'templates/header.php';

switch ($route) {
  case '':
    require 'templates/main.php';
    break;
  case 'cart':
    require 'templates/cart.php';
    break;
  case 'cart.php':
    require 'templates/cart.php';
    break; 
}
require 'templates/footer.php'
?>