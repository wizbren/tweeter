$(document).ready(function() {   //Select tweet form, listen for submit event
  
  $('form').on('submit', function(event) {  //Halts default browser behaviour of reloading
    event.preventDefault();                 //on form submission

    const serializedData = $(this).serialize();  //Serialize form data into query string

    $.post('/api/tweets', serializedData)   //Send serialized data to server through POST req
      .done(function(response) {
        console.log('Success!', response);
      })
      .fail(function(error) {
        console.error('Failed...', error);
      })
  });
});


/*Function to build and return tweets*/
const createTweetElement = function(tweet) {
  const howLongAgo = timeSince(tweet.created_at);

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






/*Function to keep track of when tweets were created*/
/*function timeSince(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const hours = Math.floor(seconds / 3600);

  if (hours < 1) {
    return 'less than an hour ago';
  }
  if (hours === 1) {
    return '1 hour ago';
  }
  return hours + ' hours ago';
}*/