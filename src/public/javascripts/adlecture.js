$(document).ready(function () {

  $('#btnSearch').click(function(){
    const inputSearch = $('#inputSearch').val();
    console.log(inputSearch)

   
    console.log(count)
    
  })
  const count = $('.badge-counter')
  const cac = function(){
    $.ajax({
      type: "GET",
      url: `http://localhost:3000/lecture/getdata`,
      data: "data",
      dataType: "json",
      success: function (response) {
        console.log(response.length)
        count.text(response.length)
      }
    });
  }

  setInterval(cac, 3000)
  
});