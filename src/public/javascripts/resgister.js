document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.btn-primary');

  button.addEventListener('click', function (e) {
    e.preventDefault();
    const password = document.getElementById('inputPassword').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    const form = document.getElementById('create-account');
    const name = document.getElementById('inputName').value.length;
    const phone = document.getElementById('inputPhone').value.length;
    const email = document.getElementById('inputEmail').value.length;

    if (!name && !phone && !email)
      return alert('Vui lòng nhập thêm thông tin còn thiếu');

    if (password.length < 8) return alert('Mật khẩu phải có ít nhất 8 ký tự');

    if (password === repeatPassword && password && repeatPassword)
      form.submit();
    else alert('Mật khẩu không khớp vui lòng nhập lại!');

    console.log(password);
    console.log(repeatPassword);
  });
});
