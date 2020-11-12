$('#previewCourse').click(function(){
    $('.preVideo')[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
});

$('.close').click(function(){
    $('.preVideo')[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
});