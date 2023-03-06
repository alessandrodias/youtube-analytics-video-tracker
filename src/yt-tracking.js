class YtTracking {
  /**
   * YtTracking class
   * @param {object} player - YouTube player object
   * @param {object} options
   * @returns
   */
  constructor(player, options) {
    if ((player === null) || (player === undefined)) {
      throw new Error('Missing YouTube player object');
      return;
    }

    if ((!options.callback) || (options.callback === null) || (typeof options.callback !== 'function')) {
      throw new Error('Missing the callback function');
      return;
    }

    this.player = player;
    this.trackValues = options.trackings || ['0%', '25%', '50%', '75%', '100%'];
    this.callback = options.callback;
    this.trackList = [];
    this.videoTimer = null;

    this.setupTrackList();
  }

  setupTrackList = () => {
    for (var i = 0, j = this.trackValues.length; i < j; i++) {
      this.trackList[this.trackValues[i]] = false;
    }
  }

  onVideoStateChange = (state) => {
    // YouTube Video States
    // -1 = Not Started
    //  0 = Ended
    //  1 = Playing
    //  2 = Paused

    switch(state) {
      case YT.PlayerState.PLAYING:
        this.startVideoTimer();
        break;
      case YT.PlayerState.ENDED:
        this.verifyVideoTime();
        this.stopVideoTimer();
        break;
      default:
        this.stopVideoTimer();
        break;
    }
  }

  startVideoTimer = () => {
    this.videoTimer = setInterval(() => {
      this.verifyVideoTime();
    }, 1000);
  }

  stopVideoTimer = () => {
    clearInterval(this.videoTimer);
  }

  verifyVideoTime = () => {
    const totalTime = this.player.getDuration();
    const elapsedTime = Math.round(this.player.getCurrentTime());
    let type, currentValue, percentage = 0;

    for(var i = 0, j = this.trackValues.length; i < j; i++) {
      type = this.trackValues[i].substr(this.trackValues[i].length -1);
      currentValue = this.trackValues[i].replace(type, '');

      if (!this.trackList[this.trackValues[i]]) {
        if (type === '%') {
          // track by percentage
          percentage = Math.round(((100 * elapsedTime) / totalTime));

          if (percentage >= currentValue) {
            this.refreshTrackList(this.trackValues[i]);
          }
        } else if (type === 's') {
          // track by seconds
          if (elapsedTime >= currentValue) {
            this.refreshTrackList(this.trackValues[i]);
          }
        }
      }
    }
  }

  refreshTrackList = (trackValue) => {
    this.trackList[trackValue] = true;
    this.publish(trackValue);
  }

  publish = (trackValue) => {
    this.callback(trackValue);
  }
}
