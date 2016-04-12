var player,
		percentagesList,
		percentagesListItems,
		progressBar;

function _construct() {
	percentagesList = $('#percentages-list');
	percentagesListItems = $('li', percentagesList);
	progressBar = $('#progress-bar');

	_loadYouTubeIframeAPI();
}

function _loadYouTubeIframeAPI() {
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

window.onYouTubeIframeAPIReady = function() {
	_embedYoutubeVideo('player');
};

function _embedYoutubeVideo(playerId) {
	player = new YT.Player(playerId, {
		height: '455',
		width: '621',
		videoId: 'hFjwbKMlmF4',
		playerVars: {
			'autoplay': 0,
			rel: 0
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onStateChange
		}
	});
}

function onPlayerReady(event) {
	event.target.tracking = new YtTracking(event.target, updateList, [0, 25, 50, 75, 100]);
}

function onStateChange(event) {
	event.target.tracking.onVideoStateChange(event.data);
}

function updateList(percentage) {
	for (var i = 0, j = percentagesListItems.length; i < j; i++) {
		if ( parseInt($(percentagesListItems).eq(i).attr('data-percentage'), 10) === percentage ) {
			$(percentagesListItems).eq(i).addClass('active');
		}
	}

	if (percentage === 100) {
		$(progressBar).addClass('complete');
	} else {
		$(progressBar).css('width', percentage + '%');
	}
}

(function() {
	_construct();
})();