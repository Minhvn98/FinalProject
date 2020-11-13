// Call the dataTables jQuery plugin
$(document).ready(function () {
  $("#dataTable").DataTable();

  $(".btn-edit").click(function (event) {
    const id = $(this)[0].nextElementSibling.nextElementSibling.textContent
    const name = $(this)[0].parentElement.parentElement.parentElement
      .children[0].textContent;
    const desc = $(this)[0].parentElement.parentElement.parentElement
      .children[1].textContent;
    const email = $(this)[0].parentElement.parentElement.parentElement
      .children[2].textContent;
    const phone = $(this)[0].parentElement.parentElement.parentElement
      .children[3].textContent;
    const categories = $(this)[0].parentElement.parentElement.parentElement
      .children[4].textContent;

    const obj = {
      id,
      name,
      desc,
      email,
      phone,
      categories,
    };

    const listSelected = [
      "Lập trình Web",
      "Lập trình Mobile",
      "Lập trình Game",
    ];

    $("#idLecture").val(id);
    
    $("#inputEditNameLecture").val(name);
    $("#inputEditEmailLecture").val(email);
    $("#inputEditPhoneLecture").val(phone);
    $("#selectEditCategories")[0].selectedIndex = listSelected.indexOf(
      categories
    );
    //$('#editAvatarLecture').val('rỗng')
    $("#inputEditDescLecture").val(desc);
    console.log(obj);
  });

  $('.btn-delete').click(function() {
    const name = $(this)[0].parentElement.parentElement.parentElement
      .children[0].textContent;

    const id = $(this)[0].nextElementSibling.textContent

    $('#nameDelete')[0].textContent = `Bạn có muốn xóa giảng viên : ${name}`;
    $('#idDelete').val(id);
    console.log(id)
  });
});
