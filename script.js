$(document).ready(function() {
  const content = $(".content");
  let currentPosition = -200; // Initial background position
  let lastScrollTop = 0;

  $('.container').scroll(function(event) {
    // Calculate the current scroll position
    let st = $(this).scrollTop();

    // Check if scrolling down
    if (st > lastScrollTop) {
      // Downscroll code
      currentPosition -= 10; // Change this value to adjust step size
    } else {
      // Upscroll code
      currentPosition += 10; // Change this value to adjust step size
    }

    // Update the background position
    content.css("background-position-x", currentPosition + "px");

    // Update the last scroll position
    lastScrollTop = st;
  });
});