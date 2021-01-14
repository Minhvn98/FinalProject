// Call the dataTables jQuery plugin
$(document).ready(function () {
  $('#dataTable').DataTable();

  function getDataEdit(event) {
    const id = $(this)[0].nextElementSibling.nextElementSibling.textContent;
    const avatar = $(this)[0].nextElementSibling.nextElementSibling
      .nextElementSibling.textContent;
    const element = $(this)[0].parentElement.parentElement.parentElement
      .children;
    const name = element[0].textContent;
    const desc = element[1].textContent;
    const email = element[2].textContent;
    const phone = element[3].textContent;
    const categories = element[4].textContent;

    const obj = {
      id,
      name,
      desc,
      email,
      phone,
      categories,
      avatar,
    };

    const listSelected = [
      'Lập trình Web',
      'Lập trình Mobile',
      'Lập trình Game',
    ];

    $('#idLecture').val(id);
    $('#avatar2').val(avatar);
    $('#inputEditNameLecture').val(name);
    $('#inputEditEmailLecture').val(email);
    $('#inputEditPhoneLecture').val(phone);
    $('#selectEditCategories').val(categories);
    $('#inputEditDescLecture').val(desc);
    console.log(obj);
  }

  function getIdDelete() {
    const name = $(this)[0].parentElement.parentElement.parentElement
      .children[0].textContent;

    const id = $(this)[0].nextElementSibling.textContent;

    $('#nameDelete')[0].textContent = `Bạn có muốn xóa giảng viên : ${name}`;
    $('#idDelete').val(id);
    console.log(id);
  }

  $('.btn-edit').click(getDataEdit);
  $('.btn-delete').click(getIdDelete);

  $('#dataTable_paginate').click(function () {
    $('.btn-edit').click(getDataEdit);
    $('.btn-delete').click(getIdDelete);
  });
});
