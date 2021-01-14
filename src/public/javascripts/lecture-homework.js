$(document).ready(function () {
  $('.btn-comment').click(function (e) {
    $('#idHomework').val(this.nextElementSibling.textContent);
    $('#idUserReceived').val(
      this.nextElementSibling.nextElementSibling.textContent
    );
  });
});
