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

const formComment = $('#formComment');

$('#btn-submit').click(function () {
  const inputComment = $('#input-comment').val();
  if (inputComment) {
    formComment.submit();
  }
});
