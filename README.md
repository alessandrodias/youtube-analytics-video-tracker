# youtube-tracker

Javascript class for tracking percentage of watched YouTube video and send to Google Analytics

[Optional] You can set the tracking points you want by passing it as an array

## Usage
You will need the following YouTube api callbacks:

```
events: {
    'onReady': onPlayerReady,
    'onStateChange': onStateChange
}
```

Then, in the **'onReady'** callback, you instantiate the youtube-tracker class, passing the **event** as a parameter:
```
function onPlayerReady(event) {
    event.target.tracking = new YtTracking(event.target, CALLBACK_FUNCTION);
}
```

And in the **'onStateChange'** callback, you call the video tracker function, passing the **event** as a parameter:
```
function onStateChange(event) {
    event.target.tracking.onVideoStateChange(event.data);
}
```

Then it will be watching for the YouTube video percentage watched. By default, it watches for: 0%, 25%, 50%, 75%

## Options
When calling the onReadyCallback, you can set the **third parameter**, with the percentages you want to track, as the following example:
```
function onPlayerReady(event) {
    event.target.tracking = new YtTracking(event.target, CALLBACK_FUNCTION, [0, 30, 50, 100]);
}
```

Made with ♥ by [Alessandro Dias](https://www.facebook.com/ale.bruno.dias) and [Ginaldo Terencio](https://github.com/ginaldoterencio).

Design of the [Demo Page](http://alessandrodias.github.io/youtube-tracker) by [Matheus Porto](https://www.facebook.com/matheus.portoo).