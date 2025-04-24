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