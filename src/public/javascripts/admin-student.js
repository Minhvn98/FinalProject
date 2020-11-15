// Call the dataTables jQuery plugin
$(document).ready(function () {
  $("#dataTable").DataTable();
  function getDataEdit() {
    const element = $(this)[0].parentElement.parentElement.parentElement.children;

    const id = $(this)[0].parentElement.lastElementChild.textContent;
    const name = element[0].textContent;
    const email = element[1].textContent;
    const phone = element[2].textContent;
    const courses = element[3].textContent;
    const lecture = element[4].textContent;
  
    const obj = {
      id,
      name,
      email,
      phone,
      courses,
      lecture,
    };

    // const listSelected = [
    //   "Lập trình Web",
    //   "Lập trình Mobile",
    //   "Lập trình Game",
    // ];

    // const listLecture = [];

    // const lst = $('#selectLecture')[0];
    // for(let item of lst) {
    //   listLecture.push(item.value)
    // }
    
    $('#idStudent').val(id);
    $('#nameStudent').val(name);
    $('#emailStudent').val(email);
    $('#phoneStudent').val(phone);
    console.log(obj);
  }

  function getIdDelete() {
    const name = $(this)[0].parentElement.parentElement.parentElement
      .children[0].textContent;

    const id = $(this)[0].nextElementSibling.textContent;

    $('#nameDelete')[0].textContent = `Bạn có muốn xóa học viên : ${name}`;
    $('#idDelete').val(id);
    console.log(id);
  }

  $(".btn-edit").click(getDataEdit);
  $('.btn-delete').click(getIdDelete);

  $('#dataTable_paginate').click(function(){
    $(".btn-edit").click(getDataEdit);
    $('.btn-delete').click(getIdDelete);
  })
});
