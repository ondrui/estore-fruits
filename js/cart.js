//вывести содержимое корзины
//позволить пользователю менять сожержимое (добавлять или уменьшать кол-во, удалять товар)
//отправить письмо в заказом

let cart = {};

function loadCart() {
  //проверяю если в localStorage запись cart
  if (localStorage.getItem("cart")) {
    //если есть - расшифровываю и записываю в переменную cart
    cart = JSON.parse(localStorage.getItem("cart"));
    //console.log(isEmpty(cart));
    showCart();
  } else {
    //$('.main-cart').html('Корзина пуста!');
    document.querySelector(".main-cart").innerHTML = "Корзина пуста!";
  }
  showAllQuantityInCart();
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains("del-goods")) {
      delGoods();
    } 
    if (event.target.classList.contains("plus-goods")) {
      plusGoods();
    }
    if (event.target.classList.contains("minus-goods")) {
      minusGoods();
    }
    if (event.target.classList.contains("send-email")) {
      event.preventDefault;
      sendEmail();
    }
  });
  //showAllQuantityInCart();
}



function showCart() {
  //вывод корзины
  if (!isEmpty(cart)) {
      document.querySelector(".main-cart").innerHTML = "Корзина пуста!";
    } else {
 /* $.getJSON('goods.json', function (data) {
    let goods = data;
    //console.log(goods);
  });*/
    //vanilla JavaScript
    /*fetch("goods.json")
      .then(response => response.json())
      .then(result => {*/
        
    fetch("admin/core.php", 
  {
    method: "POST",
    body: "action=loadGoods",
    headers:{"content-type": "application/x-www-form-urlencoded"}
  })
  .then(response => response.text())
  .then(result => {   
      let goods = JSON.parse(result);
      //console.log(result);
      let out = "";
      for (let id in cart) {
        out += `  <button data-id="${id}" class="del-goods">x</button>  `;
        out += `<img src="images/${goods[id].img}">`;
        out += ` ${goods[id].name  }`;
        out += `  <button data-id="${id}" class="minus-goods">-</button>  `;
        out += ` ${cart[id]  }`;
        out += `  <button data-id="${id}" class="plus-goods">+</button>  `;
        out += cart[id]*goods[id].cost;
        out += '<br>';
      }
      //$('.main-cart').html(out);
      //$('.del-goods').on('click', delGoods);
      //vanilla JavaScript
      document.querySelector(".main-cart").innerHTML = out;
      /*document.addEventListener('click', function(event) {
      if (event.target.classList.contains("del-goods")) {
        delGoods();
      } 
      if (event.target.classList.contains("plus-goods")) {
        plusGoods();
      }
    });*/
    })
  } 
  showAllQuantityInCart();  
}

function delGoods() {
  //удаление товара из корзины
  //let id = $(this).attr('data-id');
  let id = event.target.getAttribute("data-id");
  delete cart[id];
  //showAllQuantityInCart();
  saveCart();
  showCart();
}

function plusGoods() {
  //увеличение товара корзине 
  //let id = $(this).attr('data-id');
  //console.log(event.target.getAttribute("data-id"));
  let id = event.target.getAttribute("data-id");
  cart[id]++;
  //showAllQuantityInCart();
  saveCart();
  showCart();
}

function minusGoods() {
  //уменьшение товара корзине 
  //let id = $(this).attr('data-id');
  //console.log(event.target.getAttribute("data-id"));
  let id = event.target.getAttribute("data-id");
  if (cart[id] == 1) { //если количество товара ноль удаляем товар из корзины
    delGoods();
    return true;
  } else {
  cart[id]--;
  }
  //showAllQuantityInCart();
  saveCart();
  showCart();
}

function saveCart() {
  //сохранение корзины в localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(object) {
  //проверка корзины на пустоту
  for (let key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
  //отправляем форму на сервер
  //let ename = $('input[name="ename"]').val();
  //let email = $('input[name="email"]').val();
  //let ephone = $('input[name="ephone"]').val();
  let ename = document.querySelector("input[name='ename']").value;
  let email = document.querySelector("input[name='email']").value;
  let ephone = document.querySelector("input[name='ephone']").value;
  //console.log(ename);
  if (ename !== '' && email !== '' && ephone !== '') {
    if(!isEmpty(cart)) {
      alert("Корзина пуста!");
    } else {
      //отправляем форму на сервер
      //jquery - easy))
      /*$.post(
        "core/mail.php",
        {
          "ename" : ename,
          "email" : email,
          "ephone" : ephone,
          "cart" : cart
        },
        function(data) {
          if (data == 1) {
            alert('Заказ успешно отправлен!');
          } else {
            alert('Повторите заказ!');
          }
        }
      );*/
      //vanilla JavaScript -> OOO))
      let data = new FormData();
      data.append('ename', ename);
      data.append('email', email);
      data.append('ephone', ephone);
      //data.append('cart', cart);
      for (let id in cart) {
            data.append(`cart[${id}]`, cart[id]);
        }
      fetch("core/mail.php", {
        method: "POST",
        body: data,
      })
        .then(response => response.text())
        .then(result => {
          console.log(result);
         if(result == 1) {
            alert("Заказ успешно отправлен");
            //очистить корзину
            //                     !!!! localStorage.clear();
            //перейти на основную страницу
            document.location.href = "";
          } else {
            //console.log(result);
            showErrorText(result);
            alert('Повторите заказ!');
          }
        });
    }
  } else {
    alert("Заполните поля");
  }
}

function showErrorText(error) {
  let errorElement = document.querySelector(".error-text");
  errorElement.classList.remove("d-none");
  errorElement.innerHTML = error;
}

function showAllQuantityInCart() {
  //показывает кол-во общее товара на рисунке корзины в правом верхнем углу
  let sumCart = 0;
  for (let key in cart) {
    sumCart += cart[key];
  }
  if (sumCart > 0) {
    //console.log(sumCart);
    let countBasket = document.querySelector(".countBasket");
    countBasket.textContent = sumCart;
    countBasket.classList.add('dom');
  } else {
    //console.log(document.querySelector(".countBasket"));
    let countBasket = document.querySelector(".countBasket");
    countBasket.textContent = "";
    countBasket.classList.remove('dom');
  }
}

$(document).ready(function() {
  loadCart();
  //jquery
  //$('.send-email').on('click', sendEmail); //отправить письмо с заказом
});