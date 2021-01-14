$(document).ready(function () {
  $('#previewCourse').click(function () {
    $('.preVideo')[0].contentWindow.postMessage(
      '{"event":"command","func":"stopVideo","args":""}',
      '*'
    );
  });

  $('.close').click(function () {
    $('.preVideo')[0].contentWindow.postMessage(
      '{"event":"command","func":"stopVideo","args":""}',
      '*'
    );
  });

  $('.btn-edit').click(function () {
    const id = this.parentElement.lastChild.textContent;
    const content = this.parentElement.parentElement.firstChild.textContent;
    $('#idYouCanLearn').val(id);
    $('#editContent').val(content);
  });

  $('.btn-delete').click(function () {
    const id = this.parentElement.lastChild.textContent;
    const content = this.parentElement.parentElement.firstChild.textContent;

    $('#idDeleteYouCanLearn').val(id);
    $('#contentDelete')[0].textContent = `Bạn có muốn xóa : ${content} ?`;
  });

  $('.editLesson').click(function () {
    const id = this.parentElement.lastChild.textContent;
    const path = this.parentElement.parentElement.firstChild.pathname;
    const title = this.parentElement.parentElement.firstChild.textContent;

    $('#idLesson').val(id);
    $('#oldPath').val(path);
    $('#editTitleLesson').val(title);
  });

  $('.deleteLesson').click(function () {
    const id = this.parentElement.lastChild.textContent;
    const title = this.parentElement.parentElement.firstChild.textContent;

    $('#idDeleteLesson').val(id);
    $('#contentLesson')[0].textContent = `Bạn có muốn xóa : ${title}`;
  });

  // Homework
  $('.editHW').click(function () {
    const id = this.parentElement.lastChild.textContent;
    const path = this.parentElement.parentElement.firstChild.pathname;
    const title = this.parentElement.parentElement.firstChild.textContent;

    $('#idHomeWork').val(id);
    $('#oldPathHW').val(path);
    $('#editTitleHW').val(title);
  });

  $('.deleteHW').click(function () {
    const id = this.parentElement.lastChild.textContent;
    const title = this.parentElement.parentElement.firstChild.textContent;

    $('#idDeleteHW').val(id);
    $('#contentHomeWork')[0].textContent = `Bạn có muốn xóa : ${title}`;
  });

  // Document
  $('.editDoc').click(function () {
    const id = this.parentElement.lastChild.textContent;
    const path = this.parentElement.parentElement.firstChild.pathname;
    const title = this.parentElement.parentElement.firstChild.textContent;

    $('#idDoc').val(id);
    $('#oldPathDoc').val(path);
    $('#editTitleDoc').val(title);
  });

  $('.deleteDoc').click(function () {
    const id = this.parentElement.lastChild.textContent;
    const title = this.parentElement.parentElement.firstChild.textContent;

    $('#idDeleteDoc').val(id);
    $('#contentDoc')[0].textContent = `Bạn có muốn xóa : ${title}`;
  });

  $('.editRequirement').click(function () {
    const id = this.parentElement.lastChild.textContent;
    const content = this.parentElement.parentElement.firstChild.textContent;
    $('#idRequirement').val(id);
    $('#editRequire').val(content);
  });

  $('.deleteRequirement').click(function () {
    const id = this.parentElement.lastChild.textContent;
    const content = this.parentElement.parentElement.firstChild.textContent;

    $('#idDeleteReq').val(id);
    $('#contentRequire')[0].textContent = `Bạn có muốn xóa : ${content} ?`;
  });

  const formComment = $('#formComment');

  $('#btn-submit').click(function () {
    const inputComment = $('#input-comment').val();
    if (inputComment) {
      formComment.submit();
    }
  });
});
