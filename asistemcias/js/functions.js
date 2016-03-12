function getToken(){
  return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWZmMGY1NmFjODcyZDI0NDJiNTcwNjQiLCJuYW1lIjoiSm9yZ2UgQWxlamFuZHJvIEZpZ3Vlcm9hIFDDqXJleiIsInVzZXIiOiJ5a254NCIsImltYWdlIjoiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzI1Ni8yNTYvZmFzaGlvbi8iLCJjcmVhdGVkIjoxNDQyNzc4OTQzNjM3LCJtYXN0ZXIiOnRydWUsInNlZWQiOjgzMzI1MDExMSwiaWF0IjoxNDU2ODcxOTg4fQ.L_gnhl6XO4MkBWvaq_cbAKT9ycGhgPY_bkWxrTnF_eQ";
}


function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
  sURLVariables = sPageURL.split('&'),
  sParameterName,
  i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}

function setPaymentDataToSales(sales_data, payment_data) {
  sales_data.forEach(function (sale) {
    sale.remaining = sale.price;
    for (var i = 0; i < payment_data.length; i++) {
      var thisPayment = payment_data[i];
      if (thisPayment.sale_id == sale._id) {
        sale.remaining -= thisPayment.price;
      }
    }
  });
}


function Attendance(student_id, club_id, partial){
  this.student_id = student_id;
  this.club_id = club_id;
  this.user_id = "55ff0ff4ac872d2442b57067";
  this.partial =  parseInt(partial);
  this.date = Date.now();
}

function Student(account, campus, name){
  this.name = name;
  this.account = account;
  this.school = campus;
  this.email = 0;
  this.modified = Date.now();
  this.created = Date.now();
}

function getProductData(product_id, products_data) {
  for (var i = 0; i < products_data.length; i++) {
    var thisProduct = products_data[i];
    if (thisProduct._id == product_id) {
      return thisProduct.name + " - $" + (Math.round(thisProduct.price * 100) / 100);
    }
  }
  return "";
}


function setProductsDataToSales(sales_data, products_data) {
  sales_data.forEach(function (sale) {
    sale.remaining = sale.price;
    sale._products = [];
    for (var i = 0; i < sale.products.length; i++) {
      var thisProductId = sale.products[i];
      var thisProduct = getProductData(thisProductId, products_data);
      sale._products.push(thisProduct);
    }
  });
}

function getTotalDebt(sales_data) {
  var total = 0;
  for (var i = 0; i < sales_data.length; i++) {
    var thisSale = sales_data[i];
    total += thisSale.remaining;
  }
  return total;
}




function generateSaleHtml(sale) {
  var date = new Date(Number(sale.date));
  var html_1 = '<div class="col-md-4"><div class="panel panel-default"><div class="panel-heading"><h3>Sale: '
  var date_txt = date.toDateString();
  var html_2 = '</h3></div><div class="panel-body"><ul class="list-group">';
  var product_data = "";
  for (var i = 0; i < sale._products.length; i++) {
    product_data += '<li class="list-group-item">';
    product_data += sale._products[i];
    product_data += '</li>';
  }
  var html_3 = '</ul></div><div class="panel-footer text-right">Remaining: $'
  var remaining = Math.round(sale.remaining * 100) / 100;
  var html_4 = '<br><small>Total: $'
  var total = Math.round(sale.price * 100) / 100;
  var html_5 = '</small></div></div></div>';
  return html_1 + date_txt + html_2 + product_data + html_3 + remaining + html_4 + total + html_5;
}


/*
<div class="col-md-4">
<div class="panel panel-default">
<div class="panel-heading">
<h3>Sale: November 3rd, 2016</h3></div>
<div class="panel-body">
<ul class="list-group">
Pulparindo - $15.00</li>
<li class="list-group-item">USB - $13.4</li>
<li class="list-group-item">Dulce - $7.00</li>
</ul>
</div>
<div class="panel-footer text-right">Remaining: $34.00
<br><small>Total: $156.03</small></div>
</div>
</div>

*/
