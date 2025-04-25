$(document).ready(function() {   //Select tweet form, listen for submit event
  
  $('form').on('submit', function(event) {  //Halts default browser behaviour of reloading
    event.preventDefault();                 //on form submission
    const tweetText = $('textarea').val();  //Get tweet from textarea
    const maxText = 140;                    //Maximum characters allowed

    if (tweetText === "") {                //Check for empty textarea
      alert("You can't send an empty tweet!");
      return;                               //Prevents form submit
    }
    if (tweetText.length > maxText) {       //Checks if tweet is below 140 chars
      alert("Your tweet is too long! 140 characters or less, please."); 
      return;                               //Prevents form submit
    }

    const serializedData = $(this).serialize();  //Serialize form data into query string

    $.post('/api/tweets', serializedData)        //Send serialized data to server through POST req
      .done(function(response) {
        console.log('Success!', response);
        loadTweets();                            //Get and display all tweets
        
        $('textarea').val('');                   //Clear textarea on success
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
  loadTweets();
});




/*Function to build and return tweets*/
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
        ${tweet.content.text}
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
  return $tweet;      //Returns jQuery tweet element
};

/*Function to render tweets server-side, and then clear container*/
const renderTweets = function(tweets) {
  const $container = $('#tweet-container');           //Pulls what's written in tweet container
  $container.empty();                                 //Clears input form

  for (const tweet of tweets) {                       //Loops through tweet data
    const $tweetElement = createTweetElement(tweet);  //Builds tweet element
    $container.prepend($tweetElement);
  }
}