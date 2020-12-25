<footer> © Version: 1.1.2 Андрей Соловьев <?= date('Y'); ?></footer>
  
<script src="js/jquery-3.5.1.min.js"></script>

<?php
switch ($route) {
  case '':
    echo '<script src="js/main.js"></script>';
    break;
  case 'cart':
    echo '<script src="js/cart.js"></script> ';
    break;
  case 'cart.php':
    echo '<script src="js/cart.js"></script> ';
    break;
}
?>
</body>
</html>


