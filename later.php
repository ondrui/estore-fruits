<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>later</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/style1.css">
</head>
<body>
  <!--<div class="cart">
    <p class="name">Фигня</p>
    <img src="images/fignya.jpg" alt="" width="128px">
    <div class="cost">545</div>
    <button class="add-to-cart">Купить</button>
  </div>-->
  
  <header>
    <a href="http://ondrui.beget.tech/estore-fruits/" class="logo"> <!--делаем картинку ссылкой-->
      <img src="http://ondrui.beget.tech/estore-fruits/images/bender.jpg" height="100%" width="139px">
    </a>
    <nav>
      <?php
      
      $menuList["корзина"] = "cart";
      $menuList["каталог"] = "";
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
        echo "<a href='http://ondrui.beget.tech/estore-fruits/$value' class='c'>$key</a>";
      }
      ?>
    </nav>
    <div class="smallcart1">
      <a href="cart">
      <img src="images/Cart_Shopping1.png" class="smallCart">
      <span class="countBasket"></span>
      </a>
    </div>
  </header>
  <h1>Избранное</h1>
  <main>
    <!--<div class="mini-cart"></div>-->
    <!--<a href="later.html">Избранное</a>-->
    <div class="goods-out"></div>
  </main>
  <footer> © Version: 1.0.3 Андрей Соловьев <?= date('Y'); ?></footer>
  


<script src="js/jquery-3.5.1.min.js"></script>  
<script src="js/later.js"></script> 
</body>
</html>