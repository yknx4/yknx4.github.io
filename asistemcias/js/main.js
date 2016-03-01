 var client_id = "561afb52588d69d463d5dce8";
 var sales_path = "http://sales-yknx4.rhcloud.com/sale?client_id=";
 var client_path = "http://sales-yknx4.rhcloud.com/client?";
 var payment_path = "http://sales-yknx4.rhcloud.com/payment?";
 var product_path = "http://sales-yknx4.rhcloud.com/product?";
 var sales_data;
 var client_data;
 var payment_data;
 var product_data;

 var clubs_path = 'http://attendance-yknx4.rhcloud.com/club';
 var clubs_data;

 function loadClubs(data){
   console.log('Loading clubs');
   clubs_data = data;
   console.log('Populating club options');
   var options = $("#club_select");
   $.each(data, function() {
     options.append($("<option />").val(this._id).text(this.name));
   });
 }

 function loadClient(data) {
     console.log("Loading client")
     data.forEach(function (client) {
         if (client._id == client_id) {
             client_data = client;
         }
     })
     $.get(payment_path, loadPayments, "json");
 }

 function loadProducts(data) {
     console.log("Loading products")
     product_data = data;
     setProductsDataToSales(sales_data, product_data);
     $.get(client_path, loadClient, "json");
 }

 function loadSales(data) {
     console.log("Loading sales")
     sales_data = data;
     $.get(product_path, loadProducts, "json");
 }

 function loadPayments(data) {
     console.log("Loading payments")
     payment_data = data;
     setPaymentDataToSales(sales_data, payment_data);
     start();
 }

 function start() {
     console.log(client_data);
     console.log(sales_data);
     console.log(payment_data);
     console.log(product_data);
     console.log("Generating page...")
     $(".first-name").text(client_data.name);
     $(".total-debt").text(getTotalDebt(sales_data));
     sales_data.forEach(function (sale) {
         var html = generateSaleHtml(sale);
         $(".sale-container").append(html);
     });
 }

 $(document).ready(function () {
     $.get(clubs_path, loadClubs, "json");
 });
