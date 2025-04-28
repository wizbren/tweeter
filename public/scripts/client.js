$(document).ready(function() {   
  
  $('form').on('submit', function(event) {       
    event.preventDefault();                 
    const tweetText = $('textarea').val();  
    const maxText = 140;                    
    const $error = $('.error-message');

    $error.slideUp();                                   //Hide error message before validating

    if (tweetText === "") {                             //Validates tweet input
      $error.text("You can't send an empty tweet!").slideDown(); 
      return;                                                   
    }
    if (tweetText.length > maxText) {                   //Checks if tweet is below 140 chars
      $error.text("Your tweet is too long! 140 characters or less.").slideDown(); 
      return;                                                
    }

    const serializedData = $(this).serialize();         //Serialize form data into query string

    $.post('/api/tweets', serializedData)                  
      .done(function(response) {
        
        loadTweets();                                   //Get tweets after posting   
        $('textarea').val('');                          //Clear textarea on success
        $('.counter').text('140');                      //Reset character counter
      })
      .fail(function(error) {
        console.error('Failed...', error);
      })
  });

  function loadTweets() {                             
    $.ajax({
      url: '/api/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        renderTweets(tweets);
      },
      error: function(err) {
        console.error('Error: Unable to fetch tweets:', err);
      }
    })
  }
  loadTweets();                                         //Load when page is ready
});


const escape = function(string) {                       //Escape user input for XSS attack prevention
  let div = document.createElement('div');              //Make empty <div> element
  div.appendChild(document.createTextNode(string));     //Put input into it
  return div.innerHTML;                                 //Get the safe version of input
}


const createTweetElement = function(tweet) {
  const howLongAgo = timeago.format(tweet.created_at);

  const $tweet = $(`
    <article class="tweet">
      <header>
        <div>
          <img src="${tweet.user.avatars}" alt="User Avatar">
          <span>${tweet.user.name}</span>
        </div>
        <span class="user-handle">${tweet.user.handle}</span>
      </header>

      <section class="tweet-text">
        ${escape(tweet.content.text)}
      </section>

      <footer>
        <span>${howLongAgo}</span>
        <div>
          <i class="fa-regular fa-flag"></i>
          <i class="fa-regular fa-retweet"></i>
          <i class="fa-regular fa-heart"></i>
        </div>
      </footer>
    </article>
  `);
  return $tweet;     
};


const renderTweets = function(tweets) {            
  const $container = $('#tweet-container');           
  $container.empty();                              //Clear container before making a new tweet      

  for (const tweet of tweets) {                      
    const $tweetElement = createTweetElement(tweet);  
    $container.prepend($tweetElement);
  }
}