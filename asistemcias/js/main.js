var clubs_path = 'http://attendance-yknx4.rhcloud.com/club';
var attendance_path = 'http://attendance-yknx4.rhcloud.com/attendance';
var students_path = 'http://attendance-yknx4.rhcloud.com/student';
var clubs_data;
var selected_club = null;
var selected_partial = 0;
var students_data = null;


//Containers
var partials = $("#partial_select");

//Text Fields
var txtAccount = $("#account");
var txtAccountReg = $("#accountReg");
var txtCampus = $("#campusReg");
var txtName = $("#nameReg");

//Buttons
var btn_add = $("#btnAdd");
var btn_reg = $("#btnRegister");

//ERROR FIELDS
var errorAccount = $("#errorAccount");
var errorRegister = $("#errorRegister");


function getStudentId(accountNumber, callback){
  for(var i = 0; i < students_data.length; i++){
    if(students_data[i].account === accountNumber){
      return students_data[i]._id;
    }
  }
  return 0;
}

function loadStudents(data){
  console.log('Loading students');
  students_data = data;
}

function loadClubs(data){
  console.log('Loading clubs');
  clubs_data = data;
  console.log(data);
  console.log('Populating club options');
  var options = $("#club_select");


  $.each(data, function() {
    options.append($("<option />").val(this._id).text(this.name).data('partials',this.partials));
  });


  options.change(function(){
    var selected = $("#club_select option:selected");
    console.log('Club selected: '+selected.val());
    selected_club = selected.val();
    selected_partial = 0;
    $(".main_title").text(selected.text());
    console.log('Adding partials: '+selected.data('partials'))
    partials.empty().append($("<option />").val(0).text('Select a partial...'));
    for(var i=1; i<=selected.data('partials');i++){
      partials.append($("<option />").val(i).text(i));
    }

  });
}

function register(){
  var pathWithToken = students_path +'?'+ $.param({token: getToken()});
  var accountNumber = parseInt(txtAccountReg.val());
  var name = txtName.val();
  var campus = txtCampus.val()
  if(accountNumber === 0){
    console.log('Error, account invalid');
    errorAccount.text('Account is invalid');
    return;
  }

  var studentId = getStudentId(accountNumber);
  if(studentId !== 0){
    console.log('Error, account alreadi exists');
    errorRegister.text('Acccount already exists');
    return;
  }

  if(name === '' || campus === '' ){
    console.log('Error, invalid data');
    errorRegister.text('Fill all the data!');
    return;
  }
  var student= new Student(accountNumber,campus,name);
  $.ajax({
    url: pathWithToken,
    type: 'post',
    data: JSON.stringify(student),
    headers: {
      "Content-Type": 'application/json'
    },
    dataType: 'json',
    success: onRegister,
    error: onRegisterFail
  });
}

function addAttendance(){
  var pathWithToken = attendance_path +'?'+ $.param({token: getToken()});
  var accountNumber = parseInt(txtAccount.val());
  var studentId = getStudentId(accountNumber);
  if(studentId === 0){
    console.log('Error, account not found');
    errorAccount.text('Invalid Account');
    return;
  }

  var attendace = new Attendance(studentId,selected_club,selected_partial);
  $.ajax({
    url: pathWithToken,
    type: 'post',
    data: JSON.stringify(attendace),
    headers: {
      "Content-Type": 'application/json'
    },
    dataType: 'json',
    success: onAttendance,
    error: onAttendanceFail
  });
}

function onAttendance(data){
  console.log('Attendance response');
  console.log(data);
  alert('Asistencia añadida');
}

function onAttendanceFail(data){
  console.log('Attendance failure');
  console.log(data);
}

function onRegister(data){
  console.log('Register response');
  console.log(data);
  students_data.push(data);
  txtAccountReg.val('');
  txtName.val('');
  alert('Registrado con Exito');
}

function onRegisterFail(data){
  console.log('Attendance failure');
  console.log(data);
  errorRegister.text('Something went wrong.');
}

function btnAddOnClick(){
  console.log('Adding attendance');
  if(selected_partial===0 || selected_club === null){
    alert('You haven\'t selected all data');
    return;
  }
  errorAccount.text('');
  addAttendance();
}

function btnRegisterOnClick(){
  console.log('Registering');
  errorRegister.text('');
  register();
}

$(document).ready(function () {
  $.get(clubs_path, loadClubs, "json");
  $.get(students_path, loadStudents, "json");
  partials.change(function(){
    var selected = $("#partial_select option:selected");
    console.log('Partial selected: '+selected.val());
    selected_partial = selected.val();
  });

  btn_add.click(btnAddOnClick);
  btn_reg.click(btnRegisterOnClick);

});
