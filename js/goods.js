let cart = {}; //корзина

//значок корзины убираем с хедера
//document.querySelector(".smallcart1").classList.add('hidden');

let hash = window.location.hash.substring(1);
console.log(hash);

//jquery
/*function init() {
  //считываем файл goods.json
  $.getJSON("goods.json", goodsOut);
  
  $.post(
    "admin/core.php"
    {
      "action" : "loadSingleGoods",
      "id" : hash
    },
      goodsOut
    );
}*/


//чистый js
function init() {
  //считываем файл goods.json
  /*fetch("goods.json")
    .then(response => response.json())
    .then(result => goodsOut(result))*/
    
  fetch("admin/core.php", 
  {
    method: "POST",
    body: `action=loadSingleGoods&id=${hash}`,
    headers:{"content-type": "application/x-www-form-urlencoded"}
  })
  .then(response => response.text())
  .then(result => goodsOut(result))
  
}

function goodsOut(data) {
  //вывод на страницу
  if(data !== 0) {
    data = JSON.parse(data);
    console.log(data);
    let out = "";
    
      out += 
      `<div class="cart">
          <button class="later" data-id="${data.id}">&#9829</button>
          <p class="name">${data.name}</p>
          <img src="images/${data.img}" alt="" width="128px">
          <p class="description">${data.description}</p>
          <div class="cost">${data.cost} &#8381</div>
          <button class="add-to-cart" data-id="${hash}">Купить</button>
      </div>
      `;
      //console.log(out);
    
    showAllQuantityInCart ();
    //jquery
    //$('.goods-out').html(out);
    //$('.add-to-cart').on('click', addToCart);
    //$('.later').on('click', addToLater);
    //console.log($('.add-to-cart'));
    
    //vanilla JavaScript
    document.querySelector(".goods-out").innerHTML = out;
    //document.querySelector(".add-to-cart").addEventListener("click", addToCart); - не работает(((
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains("add-to-cart")) {
        addToCart();
      }
      if (event.target.classList.contains("later")) {
        addToLater();
      }
    });
  } else {
    document.querySelector(".goods-out").innerHTML = 'Такого товара не сущуствует!';
  }
 
}

function addToLater() {
//добавляю товар в желания
  let later = {};
  if (localStorage.getItem("later")) {
    //если есть - расшифровываю и записываю в переменную later
    later = JSON.parse(localStorage.getItem("later"));
  }
  alert('Добавлено в избранное');
  //let id = $(this).attr('data-id');
  let id = event.target.dataset.id;
  later[id] = 1;
  localStorage.setItem('later', JSON.stringify(later));
}

function addToCart() {
//добавляем товар в корзину по клику
  //let id = $(this).attr('data-id');
  let id = event.target.getAttribute("data-id");
  //console.log(id);
  //console.log(this);
  //проверяем пустая ли корзина и нет ли там такого id
  if (cart[id] == undefined) {
    cart[id] = 1; //если нет, то делаем количество 1
  } else {
    cart[id]++; //если есть такой, то прибавляем одну шт
  }
  //console.log(cart);
  //showMiniCart();
  showAllQuantityInCart ();//отображает общее количество в кругляшке
  saveCart();
}

function saveCart() {
  //сохранение корзины в localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}
 
function showMiniCart() {
  //показываю мини корзину
  let out = "";
  for (let key in cart) {
    out += key + ' ------- ' + cart[key] +'<br>';
  }
  document.querySelector(".mini-cart").innerHTML = out;
}

function loadCart() {
  //проверяю если в localStorage запись cart
  if (localStorage.getItem("cart")) {
    //если есть - расшифровываю и записываю в переменную cart
    cart = JSON.parse(localStorage.getItem("cart"));
    //showMiniCart;
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
  loadCart();
});

