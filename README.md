YouTube Tracker
---

A simple javascript library for tracking watched percentage or seconds on YouTube videos.

## Installation ##

Import the library before your closing `<body>` tag:

```javascript
<script type="text/javascript" src="yt-tracking.min.js"></script>
```

## Usage ##

1. Apply the listeners on the following YouTube API callback events:

```javascript
events: {
  'onReady': onPlayerReady,
  'onStateChange': onStateChange
}
```

2. Create the callback functions, reciving the `event` as a parameter.

Here you need to specify the **tracking values** you want to watch for:

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

### Options ###

You can use the postfix `p` to track `percentage`:
```
  trackings: ['25p','50p','75p','100p'],
```

Or  `s` to track `seconds`:
```
  trackings: ['30s', '60s', '90s'],
```

Or you can mix them together:
```
  trackings: ['30s', '50p', '100p'],
```
