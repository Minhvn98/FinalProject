document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-login');
  const role = document.getElementById('role');

  document
    .querySelector('.btn-facebook')
    .addEventListener('click', function (e) {
      const email = document.getElementById('inputEmail').textContent.length;
      const password = document.getElementById('inputPassword').textContent
        .length;
      role.value = '1';
      if (email && password) {
        form.submit();
      }
    });
  document.querySelector('.btn-google').addEventListener('click', function (e) {
    const email = document.getElementById('inputEmail').textContent.length;
    const password = document.getElementById('inputPassword').textContent
      .length;
    role.value = '2';
    if (email && password) {
      form.submit();
    }
  });
});
