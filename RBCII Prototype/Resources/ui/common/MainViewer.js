/**
 * @author Royale Dev
 */
function MainViewer(parent, url){
	var self = Ti.UI.createWindow({
		//backgroundImage: '/images/mainmenu/bg_login.png',
		barColor : 'silver',
		navBarHidden: false
	});
	
	var container = Ti.UI.createView({
		
	});
	
	webview = Ti.UI.createWebView({
		scalesPageToFit : true
	});

  function reloadView(){
  	webview.setUrl(url);
  }

	var leftbtn = Ti.UI.createButton({
			backgroundImage:'/images/icon_arrow_left.png',
			height:33,
			width:33,
			toggle:false
		});
		
	leftbtn.addEventListener('click',function(e){
		parent.close();
	});
	
	var rightbtn = Ti.UI.createButton({
			backgroundImage:'/images/buttons/gear.png',
			height:33,
			width:33,
			toggle:false
		});
		
	rightbtn.addEventListener('click',function(e){
		openMyAccounts(getMyAccounts());	
		
	});
	
	
	//self.rightNavButton = rightbtn;
	self.leftNavButton = leftbtn;
	container.add(webview);
	self.webview = webview;
  	self.add(container);	
  	if(url != null)	reloadView();
  	return self;
}
module.exports = MainViewer;
