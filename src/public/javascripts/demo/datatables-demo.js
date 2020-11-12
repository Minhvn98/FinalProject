// Call the dataTables jQuery plugin
$(document).ready(function () {
  $(".btn-edit").click(function () {
    console.log('cc');
    $(".btn-edit").click(function (event) {
      const id = $(this)[0].nextElementSibling.nextElementSibling.textContent;
      const element = $(this)[0].parentElement.parentElement.parentElement.children;
  
      const name = element[0].textContent;
      const desc = element[1].textContent;
      const email = element[2].textContent;
      const phone = element[3].textContent;
      const categories = element[4].textContent;
      const avatar = $(this)[0].nextElementSibling.nextElementSibling.nextElementSibling.textContent
  
      const obj = {
        id,
        name,
        desc,
        email,
        phone,
        categories,
        avatar
      };
  
      const listSelected = [
        "Lập trình Web",
        "Lập trình Mobile",
        "Lập trình Game",
      ];
  
      $("#idLecture").val(id);
      $("#avatar2").val(avatar);
      $("#inputEditNameLecture").val(name);
      $("#inputEditEmailLecture").val(email);
      $("#inputEditPhoneLecture").val(phone);
      $("#selectEditCategories")[0].selectedIndex = listSelected.indexOf(
        categories
      );
     // $('#editAvatarLecture').val(avatar)
      $("#inputEditDescLecture").val(desc);
      console.log(obj);
    });
  });
  $("#dataTable").DataTable();

  // $(".btn-edit").click(function (event) {
  //   const id = $(this)[0].nextElementSibling.nextElementSibling.textContent
  //   const name = $(this)[0].parentElement.parentElement.parentElement
  //     .children[0].textContent;
  //   const desc = $(this)[0].parentElement.parentElement.parentElement
  //     .children[1].textContent;
  //   const email = $(this)[0].parentElement.parentElement.parentElement
  //     .children[2].textContent;
  //   const phone = $(this)[0].parentElement.parentElement.parentElement
  //     .children[3].textContent;
  //   const categories = $(this)[0].parentElement.parentElement.parentElement
  //     .children[4].textContent;
  //   const avatar = $(this)[0].nextElementSibling.nextElementSibling.nextElementSibling.textContent

  //   const obj = {
  //     id,
  //     name,
  //     desc,
  //     email,
  //     phone,
  //     categories,
  //     avatar
  //   };

  //   const listSelected = [
  //     "Lập trình Web",
  //     "Lập trình Mobile",
  //     "Lập trình Game",
  //   ];

  //   $("#idLecture").val(id);
  //   $("#avatar2").val(avatar);
  //   $("#inputEditNameLecture").val(name);
  //   $("#inputEditEmailLecture").val(email);
  //   $("#inputEditPhoneLecture").val(phone);
  //   $("#selectEditCategories")[0].selectedIndex = listSelected.indexOf(
  //     categories
  //   );
  //  // $('#editAvatarLecture').val(avatar)
  //   $("#inputEditDescLecture").val(desc);
  //   console.log(obj);
  // });

  function cb() {
    console.log('cc');
    $(".btn-edit").click(function (event) {
      const id = $(this)[0].nextElementSibling.nextElementSibling.textContent;
      const element = $(this)[0].parentElement.parentElement.parentElement.children;
  
      const name = element[0].textContent;
      const desc = element[1].textContent;
      const email = element[2].textContent;
      const phone = element[3].textContent;
      const categories = element[4].textContent;
      const avatar = $(this)[0].nextElementSibling.nextElementSibling.nextElementSibling.textContent
  
      const obj = {
        id,
        name,
        desc,
        email,
        phone,
        categories,
        avatar
      };
  
      const listSelected = [
        "Lập trình Web",
        "Lập trình Mobile",
        "Lập trình Game",
      ];
  
      $("#idLecture").val(id);
      $("#avatar2").val(avatar);
      $("#inputEditNameLecture").val(name);
      $("#inputEditEmailLecture").val(email);
      $("#inputEditPhoneLecture").val(phone);
      $("#selectEditCategories")[0].selectedIndex = listSelected.indexOf(
        categories
      );
     // $('#editAvatarLecture').val(avatar)
      $("#inputEditDescLecture").val(desc);
      console.log(obj);
    });
  }
  
  $("#dataTable_paginate").click(cb);
 
  //Xóa
  $('.btn-delete').click(function() {
    const name = $(this)[0].parentElement.parentElement.parentElement
      .children[0].textContent;

    const id = $(this)[0].nextElementSibling.textContent

    $('#nameDelete')[0].textContent = `Bạn có muốn xóa giảng viên : ${name}`;
    $('#idDelete').val(id);
    console.log(id)
  });
});
