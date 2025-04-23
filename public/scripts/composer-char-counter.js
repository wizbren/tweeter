

$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    const maxChars = 140;
    const currentChars = $(this).val().length;
    const remainingChars = maxChars - currentChars;

    $(this).siblings("div").find(".counter").text(remainingChars)
      .toggleClass("over-limit", remainingChars < 0);    //Toggles class if char limit exceeded(?)
  });
});