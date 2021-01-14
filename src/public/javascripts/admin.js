$(document).ready(function () {
  function displayNumberNotification(notifications) {
    let newNoti = notifications.filter((noti) => noti.status == 1);
    notifications = notifications.slice(0, 5);
    $('#alertsDropdown .badge-counter').text(newNoti.length);
    $('#alerts').text(newNoti.length + ' thông báo');
    let html = '';
    notifications.forEach((item) => {
      html += `
      <a class="dropdown-item d-flex align-items-center" href="${location.origin}${item.link}">
        <div class="mr-3">
          <div class="icon-circle bg-primary">
            <i class="fas fa-file-alt text-white"></i>
          </div>
        </div>
        <div>
          <div class="small text-gray-500">${item.createdAt}</div>
          <span class="font-weight-bold">${item.content}</span>
        </div>
      </a>
      `;
    });
    $('#showAlerts').html(html);
  }

  function getNotification() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/admin/getNotification',
      data: 'data',
      dataType: 'json',
      success: function (response) {
        displayNumberNotification(response);
        console.log(response);
      },
    });
  }
  getNotification();
  setInterval(getNotification, 3000);
});
