// Call the dataTables jQuery plugin
$(document).ready(function () {
  $("#dataTable").DataTable();

  function getDataEdit() {
    const element = $(this)[0].parentElement.parentElement.parentElement.children;

    const id = $(this)[0].parentElement.lastElementChild.textContent;
    const name = element[1].textContent;
    const image = element[0].children[0].children[0].currentSrc.split('3000')[1];
    const desc = element[2].textContent;
    const level = element[3].textContent;
    const lecture = element[4].textContent;
    const price = element[6].textContent;
    const categories = element[7].textContent;
    const videoId = $(this)[0].parentElement.children[2].textContent
    const obj = {
      id,
      image,
      name,
      categories,
      desc,
      level,
      lecture,
      price,
      videoId
    };

   
    $("#idCourse").val(id);
    $('#imgOld').val(image);
    $('#editNameCourse').val(name);
    $('#editLevel').val(level);
    $('#editCate').val(categories);
    $('#editLecture').val(lecture);
    $('#editVideoId').val(videoId);
    $('#editPrice').val(price);
    $('#editDesc').val(desc);
    console.log(obj);
  }

  function getIdDelete() {
    const name = $(this)[0].parentElement.parentElement.parentElement
      .children[1].textContent;

    const id = $(this)[0].nextElementSibling.nextElementSibling.textContent

    $('#nameDelete')[0].textContent = `Bạn có muốn xóa khóa học : ${name}`;
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
