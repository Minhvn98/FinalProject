$( document ).ready(function() {
  const formChangePassword = $('#formChangePassword');

  $('#btn-save').click(function(){
    const oldPass = $('#password').val();
    const newPass = $('#new_password').val();
    const confPass = $('#password_confirm').val();
    const message = $('#message');
    if(!newPass || !confPass || !oldPass)
      return message[0].innerText = 'Vui lòng nhập đủ thông tin!';
    if(newPass.length < 8 || confPass.length < 8 || oldPass.length < 8)
      return message[0].innerText = 'Mật khẩu phải có ít nhất 8 ký tự!';
    if(newPass !== confPass)
      return message[0].innerText = 'Mật khẩu không khớp !';
    formChangePassword.submit();
        
    
  })
});