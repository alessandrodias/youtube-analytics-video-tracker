;(function(window, $, undefined) {
	'use strict';

	var Demo = function() {

		var player,
				progressBar,
				progressMarker;

		(function construct() {
			progressBar = $('#progress-bar');
			progressMarker = $('.progress-marker');
			_loadYouTubeIframeAPI();
		})();

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
				videoId: '0L7iH3foZU0',
				playerVars: {
					'autoplay': 1,
					'rel': 0,
					'controls': 0,
					'showinfo': 0,
					'disablekb': 1
				},
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onStateChange
				}
			});
		}

		function onPlayerReady(event) {
			event.target.tracking = new YtTracking(event.target, {
				trackings: ['15s','30s','0p','20p','40p','60p','80p','100p'],
				callback: updateList
			});
			player.setVolume(0);
			player.playVideo();
		}

		function onStateChange(event) {
			event.target.tracking.onVideoStateChange(event.data);
		}

		function updateList(percentage) {

			if (percentage.indexOf('p') > -1) {
				percentage = percentage.replace('p','');
				progressBar.css('width', percentage + '%');

				if (percentage == 100) {
					$('.progress-marker').removeClass('watched');
					$('.progress-marker.p' + percentage).addClass('watched');
				} else {
					$('.progress-marker.p' + percentage).addClass('watched');
				}
			}

		}

	};

	(function() {
		var _demo = new Demo();
	})();

})(window, jQuery);