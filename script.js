$('.nested').each(function() {
  let $window = $(window), $body = $('body');
  let $nested = $(this), $nestedPlaceholder = $nested.parent();
  let verticalScrollRange, upperMargin, lowerMargin;
  $window.resize(function(){
    $nested.removeClass("sticky").css({left: 0});
    let placeholderHeight = $nestedPlaceholder.css({height: ''}).height();
    verticalScrollRange = placeholderHeight - $window.height();
    upperMargin = $nestedPlaceholder.offset().top;
    lowerMargin = upperMargin + verticalScrollRange;
    $nestedPlaceholder.height(placeholderHeight);
  });
  $window.scroll(function() {
    let scrollTop = $window.scrollTop();
    if (scrollTop > upperMargin && scrollTop < lowerMargin) {
      $nested.addClass("sticky");
      let horizontalScrollRange = $nested.width() - $body.width();
      let verticalScrollPosition = scrollTop - upperMargin;
      let horizontalScrollPosition = verticalScrollPosition / verticalScrollRange * horizontalScrollRange;
      $nested.css({left: -horizontalScrollPosition});
    } else {
      $nested.removeClass("sticky");
    }
  });
  $window.resize();
});