/**
 * @author Royale Dev
 */
function SplashScreen() {
	var win = Titanium.UI.createWindow({
	});
	
	
	
	var options = {
		url: '/etc/Royale Splash.mov',
		backgroundColor: '#111',
		scalingMode: Ti.Gesture.isPortrait() || Ti.Gesture.orientation == Ti.UI.FACE_UP ? Titanium.Media.VIDEO_SCALING_ASPECT_FIT : Titanium.Media.VIDEO_SCALING_MODE_FILL,
		mediaControlStyle: Titanium.Media.VIDEO_CONTROL_NONE // See TIMOB-2802, which may change this property name
	};
	
	
	var activeMovie = Titanium.Media.createVideoPlayer(options);
	win.add(activeMovie);
	
	activeMovie.addEventListener('complete',function()
	{
		win.close();
	});

	var event1 = 'playbackState';
	if (Ti.version >= '3.0.0') {
		event1 = 'playbackstate';
	}
	
	activeMovie.addEventListener(event1,function(e){
	    Ti.API.info('Event PlaybackState Fired: '+e.playbackState);
	    Ti.API.info('activeMovie.endPlaybackTime: '+activeMovie.endPlaybackTime);
	    Ti.API.info('activeMovie.playableDuration: '+activeMovie.playableDuration);
	});
	
	activeMovie.play();
	
	win.addEventListener('close', function() {
		activeMovie.stop();
	});
	
	return win;
};

module.exports = SplashScreen;
