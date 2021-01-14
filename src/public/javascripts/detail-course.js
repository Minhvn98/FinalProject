$(function () {
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

  $('.btnHomework').click(function () {
    const id = this.nextElementSibling.textContent;
    $('#idHomework').val(id);
    console.log(id);
  });

  // $('.btn-video').click(function () {
  //   var theModal = $(this).data('target'),
  //     videoSRC = $(this).attr('data-video'),
  //     videoSRCauto = videoSRC + '';
  //   $(theModal + ' source').attr('src', videoSRCauto);
  //   $(theModal + ' video').load();
  //   $(theModal + ' button.close').click(function () {
  //     $(theModal + ' source').attr('src', videoSRC);
  //   });
  //   console.log(theModal + ' - ' + videoSRC+ ' '+ videoSRCauto)
  //   console.log(1)
  // });

  $('.btn-video').click(function () {
    const title = this.parentElement.firstChild.textContent;
    const video = $('#videoElement')[0];
    const source = $('#videoSrc')[0];
    const videoSrc = $(this).attr('data-video');
    $('#videoModalLabel')[0].textContent = title;
    console.log(title);
    source.src = videoSrc;
    video.load();
  });

  $('#videoModal .btn-close').click(function () {
    $('#videoElement')[0].pause();
  });

  $('#videoModal').click(function () {
    $('#videoElement')[0].pause();
  });
});
