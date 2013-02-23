$(document).ready(function () {
	var $container = $('#container');

	$container.imagesLoaded(function(){
		$container.masonry({
			itemSelector : '.image',
			columnWidth : 30
		});
	});

	$container.infinitescroll({
		navSelector: '#page-nav',
		nextSelector: '#page-nav a',
		itemSelector: '.imlink',
		loading: {
			finishedMsg: 'No more images to load.',
			img: '/images/loading.gif',
			selector: '.loadmore'
		},
		prefill: true
	},
	function( newElements ) {
		var $newElems = $(newElements);
		$newElems.imagesLoaded(function(){
			$container.masonry( 'appended', $newElems, true );
		});
	}
	);
});