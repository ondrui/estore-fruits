
function init() {
  /*$.post(
    "core.php",
    {
      "action" : "init"
    },
    showGoods
  );*/
  //vanilla JavaScript
  /*let data = new FormData();
  data.append('action', 'init');*/
  fetch("core.php", {
    method: "POST",
    body: "action=init",
    headers:{"content-type": "application/x-www-form-urlencoded"}
  })
  .then(response => response.text())
  .then(result => showGoods(result))
  
  

}

function showGoods(data) {
  data = JSON.parse(data);
  console.log(data);
  let out = '<select>';
  out += '<option data-id="0">Новый товар</option>';
  for (let id in data) {
    out += `<option data-id="${id}">${data[id].name}</option>`;
  }
  out += '</select>';
  //$('.goods-out').html(out);
  document.querySelector(".goods-out").innerHTML = out;
  //вешаем слушателя на селект
  //$('.goods-out select').on('change', selectGoods);
  /*document.querySelector("select").addEventListener('change', function(event){
    selectGoods();
  });*/
  
  document.querySelector("select").onchange = event => {
    selectGoods();
  }
  
  
}

function selectGoods() {
  //let id = $('.goods-out select option:selected').attr('data-id');
  let e = event.target;
  let id = e.options[e.selectedIndex].dataset.id;
  console.log(id);
  //console.log(event.target.options[event.target.selectedIndex].attributes["data-id"].value);
  /*$.post(
    "core.php",
    {
      "action" : "selectOneGoods",
      "gid" : id
    },
    function(data) {
      data = JSON.parse(data);
      console.log(data);
      $('input[name="gname"]').val(data.name);
      $('input[name="gcost"]').val(data.cost);
      $('textarea[name="gdescr"]').val(data.description);
      $('input[name="gorder"]').val(data.ord);
      $('input[name="gimg"]').val(data.img);
      $('input[name="gid"]').val(data.id);
    }
  );*/
  
  fetch("core.php", {
    method: "POST",
    body: `action=selectOneGoods&gid=${id}`,
    headers:{"content-type": "application/x-www-form-urlencoded"}
  })
  .then(response => response.text())
  .then(result => {
    let data = result;
    data = JSON.parse(data);
    console.log(data);
    if(!data == 0) {
    document.querySelector("input[name='gname']").value = data.name;
    document.querySelector("input[name='gcost']").value = data.cost;
    document.querySelector("textarea[name='gdescr']").value = data.description;
    document.querySelector("input[name='gorder']").value = data.ord;
    document.querySelector("input[name='gimg']").value = data.img;
    document.querySelector("input[name='gid']").value = data.id;
    } else {
    document.querySelector("input[name='gname']").value = "";
    document.querySelector("input[name='gcost']").value = "";
    document.querySelector("textarea[name='gdescr']").value = "";
    document.querySelector("input[name='gorder']").value = "";
    document.querySelector("input[name='gimg']").value = "";
    document.querySelector("input[name='gid']").value = "";
      
    }
  })
}

function saveToDb() {
  let id = document.querySelector("input[name='gid']").value;
  if(id !== "") {
    /*$.post(
      "core.php",
      {
        "action" : "updateGoods",
        "id" : id,
        "gname" : $('input[name="gname"]').val(),
        "gcost" : $('input[name="gcost"]').val(),
        "gdescr" : $('textarea[name="gdescr"]').val(),
        "gorder" : $('input[name="gorder"]').val(),
        "gimg" : $('input[name="gimg"]').val(),
      },
        function(data) {
          console.log(data);
          if(data == 1) {
            alert('запись добавлена');
            init();
          } else {
            console.log(data);
          }
        });*/
        
    let data = new FormData();
    data.append('action', 'updateGoods');
    data.append('id', id);
    data.append('gname', document.querySelector("input[name='gname']").value);
    data.append('gcost', document.querySelector("input[name='gcost']").value);
    data.append('gdescr', document.querySelector("textarea[name='gdescr']").value);
    data.append('gorder', document.querySelector("input[name='gorder']").value);
    data.append('gimg', document.querySelector("input[name='gimg']").value);
    fetch("core.php",
    {
      method : "POST",
      body : data,
    })
    .then(response => response.text())
    .then(result => {
      //console.log(result);
      if(result == 1) {
        alert('запись добавлена');
        init();
      } else {
        console.log(result);
      }
    });
  } else {
    console.log('new');
    let data = new FormData();
    data.append('action', 'newGoods');
    data.append('id', 0);
    data.append('gname', document.querySelector("input[name='gname']").value);
    data.append('gcost', document.querySelector("input[name='gcost']").value);
    data.append('gdescr', document.querySelector("textarea[name='gdescr']").value);
    data.append('gorder', document.querySelector("input[name='gorder']").value);
    data.append('gimg', document.querySelector("input[name='gimg']").value);
    fetch("core.php",
    {
      method : "POST",
      body : data,
    })
    .then(response => response.text())
    .then(result => {
      //console.log(result);
      if(result == 1) {
        alert('запись добавлена');
        init();
      } else {
        console.log(result);
      }
    });
  }
}

$(document).ready(function() {
  init();
  //$('.add-to-db').on('click', saveToDb);
  document.querySelector(".add-to-db").addEventListener('click', function(event) {
    saveToDb();
  });
});