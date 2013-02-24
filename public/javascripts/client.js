$(document).ready(function () {
	var $container = $('#container');

	$container.imagesLoaded(function(){
		$container.masonry({
			itemSelector : '.image',
			columnWidth : 5,
			isFitWidth: true
		});
	});
});