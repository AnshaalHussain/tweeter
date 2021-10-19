/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const $error = $(".error-message");
  const $tweetSubmit = $("#form-submit");
  $error.hide();
  loadTweets();
  

  $tweetSubmit.on("submit", function (event) {
    event.preventDefault();
    $error.hide();
    const $formValidation = $("#tweet-text").val();

    if(!$formValidation){
      $error.text("Error: There was no text entered ")
      $error.show(350);
      return;
    } else if ($formValidation.length > 140) {
      $error.text("Word limit reached")
      $error.show(350);
      return;
    } else {

    const serial = $tweetSubmit.serialize();
    $("#tweet-text").val("");
    $(".counter-num").text("140");
    $.post("/tweets", serial)
    
    

    loadTweets();
    }
    
  });


  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };




  function createTweetElement(data) {
    let $tweet = ` <section id="tweets-container">
    <article class="tweet-post-container">  
      <header class="tweet-post-header">
        <div class="tweet-profile-info">
          <i class="fas fa-user"></i>
          <h4>${escape(data["user"]["name"])}</h4>
        </div>
        <p>${escape(data["user"]["handle"])}</p>
      </header>
        <p>${escape(data["content"]["text"])}</p>

      <footer class= "footer-container">
        <p>${timeago.format(data["created_at"])}</p>
        <div>
          <a href="#" class="footer-icon"><i class="fas fa-flag"></i></a>
          <a href="#" class="footer-icon"><i class="fas fa-retweet"></i></a>
          <a href="#" class="footer-icon"><i class="fas fa-heart"></i></a>
        </div>
      </footer>
    </article>

  </section>`

  return $tweet;

  };

  function renderTweets (dataArray) {
    for (let item in dataArray) {
      $('#tweets-container').prepend(createTweetElement(dataArray[item]));
    }

  };

  function loadTweets() {
    $.ajax({
        url: "/tweets",
        type: "GET",
        dataType: 'json',
        success: function(data){
          renderTweets(data);
        }
    })
  
  };


});