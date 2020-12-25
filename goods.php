<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Описание товара</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/style1.css">
</head>
<body>
  <header>
    <a href="index.php" class="logo"> <!--делаем картинку ссылкой-->
      <img src="http://ondrui.beget.tech/estore/images/bender.jpg" height="100%" width="139px">
    </a>
    <nav>
      <?php
      
      $menuList["корзина"] = "cart.php";
      $menuList["каталог"] = "index.php";
      $menuList["новости"] = "news.php";// для хранения ссылок
      
      if($_SESSION["user"] == null){ // если неавторизованны
        $menuList["вход"] = "auth.php";
        $menuList["регистрация"] = "reg.php";
      } else {
        $menuList["личный кабинет"] = "lk.php";
        $menuList["выход"] = "obr/exit.php";
      }
      //$uri = array_pop(explode("/", $_SERVER["REQUEST_URI"]));
      //показываем нужные кнопки
      $uri = $_SERVER["REQUEST_URI"]; // "/1275/projectA/main.php";
      $uri = explode("/", $uri);// ["", "1275", "projectA", "main.php"];
      $uri = array_pop($uri); // "main.php";
      
      foreach($menuList as $key => $value){
        if($value == $uri){
          continue;
        }
        echo "<a href='http://ondrui.beget.tech/estore/$value' class='c'>$key</a>";
      }
      ?>
    </nav>
    <div class="smallcart1">
      <a href="cart.php">
      <img src="images/Cart_Shopping1.png" class="smallCart">
      <span class="countBasket"></span>
      </a>
    </div>
  </header>
  <h1>Описание товара</h1>
  <main>
    <!--<div class="mini-cart"></div>-->
    <!--<a href="later.php">Избранное</a>-->
    <div class="goods-out"></div>
  </main>
  <footer> © Version: 1.0.3 Андрей Соловьев <?= date('Y'); ?></footer>
  


<script src="js/jquery-3.5.1.min.js"></script>  
<script src="js/goods.js"></script> 
</body>
</html>