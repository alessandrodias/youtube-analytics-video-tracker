YouTube Tracker
---

A simple javascript library for tracking YouTube videos.

## Demo ##

[http://alessandrodias.github.io/youtube-tracker](http://alessandrodias.github.io/youtube-tracker/)

## Installation ##

Import the library before your closing `<body>` tag:

```javascript
<script type="text/javascript" src="yt-tracking.min.js"></script>
```

Or install using **bower**:

```
bower install youtube-tracker
```

## Usage ##

You will need to apply the listeners on the following YouTube API callback events:

```javascript
events: {
  'onReady': onPlayerReady,
  'onStateChange': onStateChange
}
```

Then, create the following callback functions you defined, reciving the `event` as a parameter.

You need to specify the **tracking values** you want to watch for, and the **callback** function

```javascript
function onPlayerReady(event) {
  event.target.tracking = new YtTracking(event.target, {
    trackings: ['15s','30s','0p','25p','50p','75p','100p'],
    callback: myCallbackFunction
  });
}

function onStateChange(event) {
  event.target.tracking.onVideoStateChange(event.data);
}

function myCallbackFunction(track_value) {
  console.log('tracked:', track_value);
}
```

By default, it tracks the following percentages: 0%, 25%, 50%, 75%, 100%

### Contributors ###

Made by [Alessandro Dias](https://www.facebook.com/ale.bruno.dias) and [Ginaldo Terencio](https://github.com/ginaldoterencio)

[Demo Page](http://alessandrodias.github.io/youtube-tracker) designed by [Matheus Porto](https://www.facebook.com/matheus.portoo)