 let cart = JSON.parse(localStorage.getItem("cart"));
//jquery
/*function init() {

  $.post(
    "admin/core.php"
    {
      "action" : "loadGoods"
    },
      goodsOut
    );
}*/

//чистый js
function init() {
  fetch("admin/core.php", 
  {
    method: "POST",
    body: "action=loadGoods",
    headers:{"content-type": "application/x-www-form-urlencoded"}
  })
  .then(response => response.text())
  .then(result => goodsOut(result))
  showAllQuantityInCart ();
}

function goodsOut(data) {
  //вывод на страницу
  data = JSON.parse(data);
  let out = "";
  let later = {};
  if (localStorage.getItem("later")) {
    //если есть - расшифровываю и записываю в переменную later
    later = JSON.parse(localStorage.getItem("later"));
    for (let key in later) {
      out += 
      `<div class="cart">
          <p class="name">${data[key].name}</p>
          <img src="images/${data[key].img}" alt="" width="128px">
          <div class="cost">${data[key].cost} &#8381</div>
          <a href="goods.php#${key}">Просмотреть</a>
      </div>
      `;
      //console.log(out);
    }
    //jquery
    //$('.goods-out').html(out);
    
    //vanilla JavaScript
    document.querySelector(".goods-out").innerHTML = out;
  } else {
    //$('.goods-out').html('Добавьте товар!');
    document.querySelector(".goods-out").innerHTML = 'Добавьте товар!';
    
  }  
}

//отображение общего количества товаров в круглишке
function showAllQuantityInCart () {
  let sumCart = 0;
  for (let key in cart) {
    sumCart += cart[key];
  }
  if (sumCart > 0) {
    //console.log(sumCart);
    let countBasket = document.querySelector(".countBasket");
    countBasket.textContent = sumCart;
    countBasket.classList.add('dom');
  } 
}

$(document).ready(function() {
  init();
});


