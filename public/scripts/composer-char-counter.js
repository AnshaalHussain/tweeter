$(document).ready(function() {



$("#tweet-text").keyup(function() {
  let counter = 140;

  keypressCounter = $(this).val().length

  let newLen = counter - keypressCounter;

  $(this).parent().parent().find(".counter-num").text(newLen)
  
  if(newLen < 0) {
    $(this).parent().parent().find(".counter-num").css("color", "red")
  }

  if(newLen >= 0) {
    $(this).parent().parent().find(".counter-num").css("color", "black")
  }

});






});