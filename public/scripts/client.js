$(document).ready(function() {   //Select tweet form, listen for submit event
  
  $('form').on('submit', function(event) {//Halts default browser behaviour of reloading
    event.preventDefault();               //on form submission

    console.log("Form submit prevented!");
  });
});