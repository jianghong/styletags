var $container = $('#container');

$container.imagesLoaded(function(){
  $container.masonry({
    itemSelector : '.image',
    columnWidth : 30
  });
});