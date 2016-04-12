;(function(window, document, undefined) {
	"use strict";

	/**	----- YouTube Video States -----
	* 	[-1] Not Started
	* 	 [0] Ended
	* 	 [1] Playing
	* 	 [2] Paused
	*/

	function YtTracking(player, callback, percentages) {
		if ((player === null) || (player === undefined)) {
			throw new Error('Missing player param!');
		}

		if ((callback === null) || (callback === undefined)) {
			throw new Error('Missing callback param!');
		}

		this.player = player;
		this.callback = callback;
		this.percentages = percentages || [0, 25, 50, 75];
		this.trackings = [];
		this.videoTimer = null;
		this.setupTrackings();
	}

	YtTracking.prototype.setupTrackings = function() {
		for(var i = 0, j = this.percentages.length; i < j; i++) {
			this.trackings[this.percentages[i]] = false;
		}
	};

	YtTracking.prototype.onVideoStateChange = function(state) {
		switch(state) {
			case YT.PlayerState.PLAYING:
				this.startVideoTimer();
				break;
			case YT.PlayerState.ENDED:
				if ( this.percentages.indexOf(100) >= 0 ) {
					this.publish(100);
				}
				this.pauseVideoTimer();
				break;
			default:
				this.pauseVideoTimer();
				break;
		}
	};

	YtTracking.prototype.startVideoTimer = function() {
		var _this = this;

		this.videoTimer = setInterval( function() {
			_this.verifyVideoTime();
		}, 1000);
	};

	YtTracking.prototype.pauseVideoTimer = function() {
		clearInterval(this.videoTimer);
	};

	YtTracking.prototype.verifyVideoTime = function() {
		var totalTime = this.player.getDuration(),
			elapsedTime = this.player.getCurrentTime(),
			percentage = 0;

		percentage = ((100 * elapsedTime) / totalTime);

		for(var i = 0, j = this.percentages.length; i < j; i++) {

			if ( (percentage >= this.percentages[i]) && (this.trackings[this.percentages[i]] === false) ) {
				this.trackings[this.percentages[i]] = true;
				this.publish(this.percentages[i]);
			}
		}
	};

	YtTracking.prototype.publish = function(percentage) {
		if ( (this.callback) && (typeof this.callback === 'function') ) {
			this.callback(percentage);
		}
	};

	window.YtTracking = YtTracking;

})(this, this.document);