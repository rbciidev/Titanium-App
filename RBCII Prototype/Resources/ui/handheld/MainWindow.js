/**
 * @author Royale Developer
 */
function MainWindow(){
	var DashboardUI = require('ui/handheld/ios/DashboardUI');
	
	var self = Ti.UI.createWindow({
		title: 'Royale',
		backgroundColor: 'silver'
	});
	

	var rightNavButton = Titanium.UI.createButtonBar({
		labels:['Settings', 'Support'],
		backgroundColor:'#336699'
	});
	
	self.rightNavButton = rightNavButton;
	
	var dashboardUI = new DashboardUI();
	self.add(dashboardUI);
	
	
	return self;
}
module.exports = MainWindow;
