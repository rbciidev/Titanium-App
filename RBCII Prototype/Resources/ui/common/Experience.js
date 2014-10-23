/**
 * @author Royale Dev
 */
function Experience(){
	var url = "https://www.royaledirectsales.com/royalexperience.html";
	var self = Ti.UI.createWindow({
		barColor : 'silver',
	});
	self.orientationModes =  [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT];
	
	var container = Ti.UI.createView({
		
	});
	
	webview = Ti.UI.createWebView({
		scalesPageToFit : true,
	});

  function reloadView(){
  	webview.setUrl(url);
  }

	container.add(webview);
  	self.add(container);
	reloadView();
  	return self;
}
module.exports = Experience;
