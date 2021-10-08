$(document).ready(function() {



$("#tweet-text").keyup(function() {
  let counter = 0;

  counter = $(this).val().length

  $(this).parent().parent().find(".counter-num").text(counter)
  
  if(counter > 140) {
    $(this).parent().parent().find(".counter-num").css("color", "red")
  }

});






});