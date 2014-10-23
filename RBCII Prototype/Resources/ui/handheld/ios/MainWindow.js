/**
 * @author Royale Developer
 */
function MainWindow(parent){
	var DashboardUI = require('ui/handheld/ios/DashboardUI');
	
	var self = Ti.UI.createWindow({
		title: 'Royale',
		backgroundColor: 'silver',
		barColor : 'silver'
	});
	
	var menuWin = Ti.UI.createWindow({
		title:'Settings',
		width:320
	});
	
	menuWin.open();
	var navGroup = Ti.UI.iOS.createNavigationWindow();
	navGroup.window = self;
	menuWin.add(navGroup);
	
	

	var leftbtn = Ti.UI.createButton({
			backgroundImage:'/images/icon_arrow_left.png',
			height:33,
			width:33,
			toggle:false
		});
		
	leftbtn.addEventListener('click',function(e){
		//EncodingSummary = require('ui/common/EncodingSummary');
		//var encodingSummary = new EncodingSummary();
		//self.containingTab.open(encodingSummary, {animated:true});
		parent.close();
	});
	
	var rightbtn = Ti.UI.createButton({
			backgroundImage:'/images/icons/accounts.png',
			height:33,
			width:33,
			toggle:false
		});
		
	rightbtn.addEventListener('click',function(e){
		openMyAccounts(getMyAccounts());	
		
	});
	
	
	self.rightNavButton = rightbtn;
	self.leftNavButton = leftbtn;
	
	var dashboardUI = new DashboardUI(self);
	self.add(dashboardUI);
	
	
	return self;
}
module.exports = MainWindow;
